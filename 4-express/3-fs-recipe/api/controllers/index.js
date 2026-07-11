import { readDB, validateRecipe, writeDB } from "../utils/helpers.js";
import crypto from "crypto";

const recipes = readDB();

const getAllRecipes = (req, res) => {
  // tarif verilerini tuttuğumuz değişken
  let filtred = [...recipes];

  // isteğin query bölümdeki search parametresine eriş
  const search = req.query?.search?.toLocaleLowerCase();

  // eğer search parametresi varsa adında aratılan kelime geçen tarifleri bul
  if (search) {
    filtred = recipes.filter((i) => i.name.toLocaleLowerCase().includes(search));
  }

  // eğer order parametresi varsa sıralama yap
  if (req.query.order) {
    filtred.sort((a, b) => (req.query.order === "asc" ? a.time - b.time : b.time - a.time));
  }

  // client'a yanıt gönder
  res.json({ message: "Tarifler listelendi", results: filtred.length, data: filtred });
};

const getOneRecipe = (req, res) => {
  // parametre olarak gelen id değerine eriş
  const id = req.params.id;

  // id'yi dizide ara
  const found = recipes.find((i) => i.id === id);

  // bulunamadıysa:
  if (!found) return res.status(404).json({ message: "Aradığınız tarif bulunamadı" });

  // client'a yanıt gönder
  res.json({ message: "Tarif bulundu", data: found });
};

const createRecipe = (req, res) => {
  // gelen veri doğru formatta mı
  if (!validateRecipe(req.body))
    return res.status(400).json({ message: "Gönderdiğiniz veri hatalı" });

  // veriye id ekle
  const newRecipe = {
    id: crypto.randomUUID(),
    ...req.body,
  };

  // veriyi diziye
  recipes.push(newRecipe);

  // db.json'ı güncelle
  writeDB(recipes);

  // client'a yanıt gönder
  res.status(201).json({ message: "Tarif oluşturuldu", data: newRecipe });
};

const updateRecipe = (req, res) => {
  // güncellenicek elemanın sırasını bul
  const index = recipes.findIndex((i) => i.id === req.params.id);

  // tarif bulunamadıysa:
  if (!recipes[index])
    return res.status(404).json({ message: "Güncellemek istediğiniz tarif bulunamadı" });

  // body'den gelen veri yanlış formattaysa:
  if (!validateRecipe(req.body))
    return res.status(400).json({ message: "Eksik veya hatalı veri gönderdiniz" });

  // güncellenen tarif nesnesi
  const updatedRecipe = { ...recipes[index], ...req.body };

  // diziyi güncelle
  recipes.splice(index, 1, updatedRecipe);

  // json dosyasını güncelle
  writeDB(recipes);

  // client'a yanıt gönder
  res.json({ message: "Tarif güncellendi", data: updatedRecipe });
};

const deleteRecipe = (req, res) => {
  // parametre olarak gelen id'li tarifin dizideki sırasını bul
  const index = recipes.findIndex((i) => i.id === req.params.id);

  // tarif bulunamadıysa:
  if (!recipes[index]) return res.status(404).json({ message: "Tarif bulunamadı" });

  // diziden tarifi kaldır
  recipes.splice(index, 1);

  // json dosyasını güncelle
  writeDB(recipes);

  // client'a yanıt gönder
  res.status(204).json({ message: "Tarif kaldırıldı", data: null });
};

export { getAllRecipes, getOneRecipe, createRecipe, updateRecipe, deleteRecipe };
