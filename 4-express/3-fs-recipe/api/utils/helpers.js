import fs from "fs";

// json dosyasındaki içeriği okuyup js formatına çevir
const readDB = () => {
  try {
    const jsonData = fs.readFileSync("./data/db.json", "utf-8");

    const jsData = JSON.parse(jsonData);

    return jsData;
  } catch (error) {
    console.log(error);
  }
};

// parametre olarak aldığı veriyi json dosyasına yazan fonksiyon
const writeDB = (data) => {
  try {
    fs.writeFileSync("./data/db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

// isteğin body bölümünde gelen veriler eksiksiz mi kontrol eden fonksiyon
const validateRecipe = (data) => {
  if (
    typeof data.name !== "string" ||
    typeof data.image !== "string" ||
    typeof data.country !== "string" ||
    typeof data.serving !== "string" ||
    typeof data.category !== "string" ||
    typeof data.time !== "number" ||
    !Array.isArray(data.ingredients) ||
    !Array.isArray(data.instructions)
  ) {
    return false;
  }

  return true;
};

export { readDB, writeDB, validateRecipe };
