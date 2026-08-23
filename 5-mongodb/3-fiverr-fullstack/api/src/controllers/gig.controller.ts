import type { NextFunction, Request, Response } from "express";
import { Forbidden, NotFound } from "../utils/error.js";
import type { Filters, ImageFiles, Query } from "../types/index.js";
import uploadToCloud from "../utils/uploadToCloud.js";
import Gig from "../models/gig.model.js";

const buildFilters = (query: Query): Filters => {
  const filters: Filters = {};

  if (query.category) filters.category = query.category;

  if (query.userId) filters.user = query.userId;

  if (query.minPrice || query.maxPrice) {
    filters.packagePrice = {};

    if (query.minPrice) filters.packagePrice.$gte = Number(query.minPrice);
    if (query.maxPrice) filters.packagePrice.$lte = Number(query.maxPrice);
  }

  if (query.search) filters.title = { $regex: query.search, $options: "i" };

  return filters;
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  // isteği atan kullanıcı satıcı hesabı mı
  if (!req.user.isSeller) throw new Forbidden();

  // dosyların tipini tanımla
  const files = req.files as unknown as ImageFiles;

  // kapak fotoğrafını cloud'a yükle
  const coverImage = await uploadToCloud(
    next,
    files.coverImage[0]!.path,
    "9-gig",
    900,
    600,
    "image",
  );

  // diğer fotoğrafları cloud'a yükle
  const promises = files.images.map((image) =>
    uploadToCloud(next, image.path, "9-gig", 900, 600, "image"),
  );

  // oluşturulan sorguları aynıanda çalışıtr
  const images = await Promise.all(promises);

  // cloud'a yüklenen resim url'lerini body'e ekle
  req.body.coverImage = coverImage.secure_url;
  req.body.images = images.map((image) => image.secure_url);

  // özellikler metnini diziye çevir
  req.body.packageFeatures = req.body.packageFeatures.split(",");

  // yeni hizmet belgesi oluştur
  const savedGig = await Gig.create({ ...req.body, user: req.user._id });

  res.status(201).json({ message: "Hizmet başarıyla oluşturuldu", data: savedGig });
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const filters = buildFilters(req.query);

  const gigs = await Gig.find(filters).populate("user", "profilePicture username");

  res.json({ message: "Hizmetler listelendi", results: gigs.length, data: gigs });
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  const gig = await Gig.findById(req.params.id).populate("user");

  if (!gig) throw new NotFound();

  res.json({ message: "Hizmet verisi bulundu", data: gig });
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  // hizmet verisini bul
  const gig = await Gig.findById(req.params.id);

  // bulamazsak hata fırlat
  if (!gig) throw new NotFound();

  // silmek isteyen kişi ile hizmeti oluşturan kişi aynı mı
  if (String(gig.user) !== String(req.user._id)) throw new Forbidden();

  // hizmeti sil
  await Gig.findByIdAndDelete(req.params.id);

  res.status(204).json({ message: "Hizmet kaldırıldı" });
};

export { getAll, getOne, create, deleteOne };
