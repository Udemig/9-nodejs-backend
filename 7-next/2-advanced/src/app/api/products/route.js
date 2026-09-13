import { NextResponse } from "next/server";

// Route Handler
export const GET = async (req) => {
  // client'a yanıt gönder
  return NextResponse.json({ message: "Ürün Listesi" }, { status: 201 });
};

export const POST = async (req) => {
  // isteğin body kısmında gelen veriye eriş
  const body = await req.json();

  return NextResponse.json({
    message: "Ürün eklendi",
    body,
  });
};
