"use server";

import Ticket from "@/app/api/models/ticket";
import connectMongo from "./connect-mongo";
import { redirect } from "next/navigation";

// server action: içerisinde doğrudan vt sorguları yapabildiğimiz server fonksiyonu
export async function createTicketAction(formData: FormData) {
  // güncellenicek elemanın id'si
  const id = formData.get("id");

  // form içerisindeki verileri al
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    priority: formData.get("priority"),
    progress: formData.get("progress"),
    status: formData.get("status"),
  };

  // frontend'den veritabanına bağlan
  await connectMongo();

  // güncelleme modundaysak güncele yoksa oluştur
  id ? await Ticket.findByIdAndUpdate(id, rawData) : await Ticket.create(rawData);

  // tickets sayfasına yönlendir
  redirect("/tickets");
}
