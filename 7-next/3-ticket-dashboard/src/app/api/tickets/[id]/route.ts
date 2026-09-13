import connectMongo from "@/utils/connect-mongo";
import Ticket, { ITicket } from "../../models/ticket";
import { NextResponse as res } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // id parametresine eriş
    const { id } = await params;

    // ticket verilerini al
    const ticket = await Ticket.findById(id);

    // ticket bulunamazsa hata fırlat
    if (!ticket) throw Error("Ticket bulunamadı");

    // client'a yanıt gönder
    return res.json({ message: "Ticket bulundu", ticket });
  } catch (error) {
    return res.json(
      {
        message: "Ticket aranırken bir hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen Hata!",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // id parametresine eriş
    const { id } = await params;

    // ticket'ı kaldır
    const ticket = await Ticket.findByIdAndDelete(id);

    // ticket bulunamazsa hata fırlat
    if (!ticket) throw Error("Ticket bulunamadı");

    // client'a yanıt gönder
    return res.json({ message: "Ticket silindi", ticket });
  } catch (error) {
    return res.json(
      {
        message: "Ticket silinirken bir hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen Hata!",
      },
      { status: 400 },
    );
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // id parametresine eriş
    const { id } = await params;

    // body verisine eriş
    const body = (await req.json()) as ITicket;

    // ticket'ı güncelle
    const ticket = await Ticket.findByIdAndUpdate(id, body, { new: true });

    // ticket bulunamazsa hata fırlat
    if (!ticket) throw Error("Ticket bulunamadı");

    // client'a yanıt gönder
    return res.json({ message: "Ticket güncellendi", ticket });
  } catch (error) {
    return res.json(
      {
        message: "Ticket güncellenirken bir hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen Hata!",
      },
      { status: 400 },
    );
  }
}
