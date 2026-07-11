import express from "express";
import cors from "cors";
import recipeRoutes from "./routes/index.js";

// express kurulum
const app = express();
const port = 4000;

// cors hatalarını öleyen mw
app.use(cors());

// json verisini işleyen mw
app.use(express.json());

// tarif route'larını express'e tanıt
app.use(recipeRoutes);

// api'ı belirlediğimiz portu dinlemeye başlat
app.listen(port, () => {
  console.log(`🚨 Server ${port} portunu dinlemeye başladı 🚨`);
});
