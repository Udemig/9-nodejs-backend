const express = require("express");
const cors = require("cors");

// custom middleware
const idKontrol = (req, res, next) => {
  if (Number(req.params.id) > 50) return res.status(404).json({ message: "ID Bulunamadı" });

  next();
};

// bir api oluştur
const app = express();

// express.json middleware'i sayesinde client'dan gönderilen bütün json verileri erişilebilir hale gelir
app.use(express.json());

// cors hatasını önleyecek header'ları yanıta otomatik olarak ekleyen middleware
app.use(cors());

// url'deki id parametresini kontrol eden mw
app.use("/users/:id", idKontrol);

// /users adresine atılan get isteğine gönderilecek yanıtı belirle
app.get("/users", (req, res) => {
  res.status(200).json({ message: "Kullanıcılar alındı", query: req.query });
});

// /users adresine atılan post isteğine gönderilecek yanıtı belirle
app.post("/users", (req, res) => {
  res.status(201).json({ message: "Kullanıcı oluşturuldu", body: req.body });
});

// /users/kullanıcı_id atılan delete isteğine gönderilecek yanıtı belirle
app.delete("/users/:id", (req, res) => {
  res.status(200).json({ message: "Kullanıcı kaldırıldı", id: req.params.id });
});

// tanımlanmayan bir endpointe istek gelirse bu yanıtı gönder
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint bulunamadı" });
});

// api'ın dinleyeceği poru belirle
const port = 4000;
app.listen(port, () => console.log(`Server ${port} portunu dinliyor`));
