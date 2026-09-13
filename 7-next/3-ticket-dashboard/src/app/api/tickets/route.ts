import { NextResponse as res } from "next/server";
import Ticket, { ITicket } from "../models/ticket";
import connectMongo from "@/utils/connect-mongo";

export async function POST(req: Request) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // isteği body kısmıdaki veriyi al
    const body = (await req.json()) as ITicket;

    // veritabanına yeni ticket'ı kaydet
    const newTicket = await Ticket.create(body);

    // client'a yanıt gönder
    return res.json({ message: "Ticket oluşturuldu", ticket: newTicket }, { status: 201 });
  } catch (error) {
    return res.json(
      {
        message: "Ticket oluşturulurken bir hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen Hata!",
      },
      { status: 400 },
    );
  }
}

export async function GET(req: Request) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // ticket verilerini al
    const tickets = await Ticket.find();

    // client'a yanıt gönder
    return res.json({ message: "Ticketlar listelendi", tickets });
  } catch (error) {
    return res.json(
      {
        message: "Ticketlar listlenirken bir hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen Hata!",
      },
      { status: 400 },
    );
  }
}
