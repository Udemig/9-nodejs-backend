import Tour from "../models/tourModel.js";
import qs from "qs";
import APIFeatures from "../utils/apiFeatures.js";

export const getAllTours = async (req, res) => {
  // sorguyu oluştur
  const features = new APIFeatures(Tour.find(), req.query, req.parsedQuery)
    .sort()
    .filter()
    .pagination()
    .select();

  // sorguyu çalıştır
  const tours = await features.toursQuery;

  // client'a yanıt gönder
  res.status(200).json({
    message: "Turlar listesindi",
    results: tours.length,
    data: tours,
  });
};

export const getOneTour = async (req, res) => {
  // istek ile birlikte gelen id parametresine eriş
  const id = req.params.id;

  // veritabanından id'si bilinen turu al
  const tour = await Tour.findById(id);

  // tur bulunamadıysa
  if (!tour) return res.status(404).json({ message: "Tur bulunamadı" });

  // client'a yanıt gönder
  res.status(200).json({
    message: "Tur listelendi",
    data: tour,
  });
};

export const createTour = async (req, res) => {
  // isteğin body kısmındaki veriye eriş
  const body = req.body;

  // yeni turu veritabanına kaydet
  const newTour = await Tour.insertOne(body);

  // client'a yanıt gönder
  res.status(201).json({
    message: "Tur sisteme eklendi",
    data: newTour,
  });
};

export const updateTour = async (req, res) => {
  // veritabanında tur belgesini güncelle
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });

  // tur bulunamadıysa hata fırlat
  if (!tour) return res.status(404).json({ message: "Tur bulunamadı" });

  // client'a yanıt gönder
  res.status(200).json({
    message: "Tur güncellendi",
    data: tour,
  });
};

export const deleteTour = async (req, res) => {
  // veritabanından id'si bilinen belgeyi kaldır
  const tour = await Tour.findByIdAndDelete(req.params.id);

  // tur bulunamadıysa
  if (!tour) return res.status(404).json({ message: "Tur bulunamadı" });

  // client'a yanıt gönder
  res.status(200).json({
    message: "Tur kaldırıldı",
    data: tour,
  });
};

// en iyi turları almamızı sağlayacak parametreleri ayarlayan middleware
export const aliasTopTours = async (req, res, next) => {
  req.query.sort = "-ratingsAverage,-ratingsQuantity";
  req.query.fields = "name,price,ratingsAverage,ratingsQuantity,summary,imageCover";
  req.query.limit = 5;

  next();
};

// tur için istatistikleri hesapla
export const getTourStats = async (req, res) => {
  try {
    // Aggeragation Pipeline
    const stats = await Tour.aggregate([
      // 1.Adım) ratingi 4 ve üzeri olan turları al
      { $match: { ratingsAverage: { $gte: 4 } } },

      // 2.Adım) zorluğa göre gruplandır ve ortalama değelerini hesapla
      {
        $group: {
          _id: "$difficulty",
          count: { $sum: 1 },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },

      // 3.Adım)
      { $sort: { _id: 1 } },
    ]);

    res.json({ message: "Rapor oluşturuldu", stats });
  } catch (error) {
    res.status(500).json({ message: "Bir sorun oluştu" });
  }
};

// todo: bir yıl içerisinde aylık planı raporla
