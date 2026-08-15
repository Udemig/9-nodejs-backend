import APIFeatures from "./apiFeatures.js";
import catchAsync from "./catchAsync.js";
import { NotFound } from "./error.js";

// Örn: Bir belgeyi silme işlemi proje içerisinde sadece model ismi değişirek defalarca ayrı ayrı yazılıp kod tekrarına sebep oluyor. Bu srounu önlemek için hangi model üzerinde işlem yapılcağını parametre olarak alan bir fonksiyon yazıp kod tekrarını önleyecez (Factory Pattern)

// Delete
export const deleteOne = (Model) =>
  catchAsync(async (req, res) => {
    const found = await Model.findByIdAndDelete(req.params.id);

    if (!found) throw new NotFound();

    res.status(204).json({ message: "İçerik kaldırıldı" });
  });

// Update
export const updateOne = (Model) =>
  catchAsync(async (req, res) => {
    const found = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!found) throw new NotFound();

    res.json({ message: "İçerik güncellendi", data: found });
  });

// Create
export const createOne = (Model) =>
  catchAsync(async (req, res) => {
    const newDocument = await Model.create(req.body);

    res.status(201).json({
      message: "İçerik oluşturuldu",
      data: newDocument,
    });
  });

// GetOne
export const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const found = await query;

    if (!found) throw new NotFound();

    res.status(200).json({ message: "Aradığınız içerik bulundu", data: found });
  });

// GetAll
export const getAll = (Model) =>
  catchAsync(async (req, res) => {
    const features = new APIFeatures(Model.find(), req.query, req.parsedQuery)
      .sort()
      .filter()
      .select()
      .pagination();

    const docs = await features.query;

    res.status(200).json({ message: "İçerik listelendi", results: docs.length, data: docs });
  });
