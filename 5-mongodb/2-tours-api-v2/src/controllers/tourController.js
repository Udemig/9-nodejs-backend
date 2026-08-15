import Tour from "../models/tourModel.js";
import qs from "qs";
import APIFeatures from "../utils/apiFeatures.js";
import { NotFound, BadRequest } from "../utils/error.js";
import catchAsync from "../utils/catchAsync.js";
import * as factory from "../utils/handlerFactory.js";

export const getAllTours = factory.getAll(Tour);

export const getOneTour = factory.getOne(Tour, [{ path: "guides", select: "name photo email" }]);

export const createTour = factory.createOne(Tour);

export const updateTour = factory.updateOne(Tour);

export const deleteTour = factory.deleteOne(Tour);

// en iyi turları almamızı sağlayacak parametreleri ayarlayan middleware
export const aliasTopTours = async (req, res, next) => {
  req.query.sort = "-ratingsAverage,-ratingsQuantity";
  req.query.fields = "name,price,ratingsAverage,ratingsQuantity,summary,imageCover";
  req.query.limit = 5;

  next();
};

// tur için istatistikleri hesapla
export const getTourStats = catchAsync(async (req, res) => {
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
});

// bir yıl içerisinde aylık planı raporla
export const getMonthlyPlan = catchAsync(async (req, res) => {
  // parametre olarak gelen yıla eriş
  const year = req.params.year;

  // istatistik hesaplama
  const stats = await Tour.aggregate([
    {
      $unwind: {
        path: "$startDates",
      },
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: {
          $month: "$startDates",
        },
        count: {
          $sum: 1,
        },
        tours: {
          $push: "$name",
        },
      },
    },
    {
      $addFields: {
        month: "$_id",
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        month: 1,
      },
    },
  ]);

  return res.json({ message: "Yıllık plan", stats });
});

// belirli bir alandaki turları filtrele
export const getToursWithin = catchAsync(async (req, res) => {
  // parametrelere eriş
  const { unit, distance, latlng } = req.params;

  // enlem/boylam değerini dizi formatına çevir
  const [lat, lng] = latlng.split(",");

  // enlem/boylam verisi sağlnamazsa hata fırlat
  if (!lat || !lng) throw BadRequest("Lütfen merkez noktasını tanımlayın");

  // daire yarıçapını radyan birimine çevir
  const radius = unit == "mi" ? distance / 3963.2 : distance / 6378.1;

  // belirlenen dairesl alandaki turları al
  const tours = await Tour.find({
    startLocation: {
      $geoWithin: {
        $centerSphere: [[lat, lng], radius],
      },
    },
  });

  res.json({
    message: "Sınırlar içerisindeki turlar algılandı",
    results: tours.length,
    data: tours,
  });
});

export const getDistances = catchAsync(async (req, res) => {
  // url'den parametreleri al
  const { latlng, unit } = req.params;

  // enlem/boylam'ı dizi formatına çevir
  const [lat, lng] = latlng.split(",");

  // turların mekez noktasından uzaklıklarını hesapla
  const tours = await Tour.aggregate([
    // 1) uzaklığı hesapla
    {
      $geoNear: {
        near: { type: "Point", coordinates: [+lat, +lng] },
        distanceField: "distance",
        //todo km veya mile çevir
      },
    },
    // 2) istediğimiz alanları seç
    {
      $project: {
        name: 1,
        distance: 2,
      },
    },
  ]);

  // client'a cevap göder
  res.json({
    message: "Uzaklıklar hesaplandı",
    data: tours,
  });
});
