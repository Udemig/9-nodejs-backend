import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import { BadRequest } from "../utils/error.js";
import * as factory from "../utils/handlerFactory.js";

export const profile = catchAsync(async (req, res) => {
  res.status(200).json({ message: "Profil bilgileri alındı", data: req.user });
});

export const deleteMe = catchAsync(async (req, res) => {
  // hesap durumunu inaktif olarak ayarla
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(200).json({ message: "Hesap silindi" });
});

export const updateMe = catchAsync(async (req, res) => {
  // 1) şifreyi güncellemeye çalışılırsa hata ver
  if (req.body.password) throw new BadRequest("Şifreyi bu yöntemle güncelleyemezsiniz");

  // 2) kullanıcı bilgilerini güncelle
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });

  res.status(200).json({ message: "Hesap bilgileri güncellendi", data: updatedUser });
});

// admin endpointleri
export const getAllUsers = factory.getAll(User);
export const getOneUser = factory.getOne(User);
export const createUser = factory.createOne(User);
export const updateUser = factory.updateOne(User);
export const deleteUser = factory.deleteOne(User);
