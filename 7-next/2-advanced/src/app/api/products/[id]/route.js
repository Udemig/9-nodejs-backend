import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  // parametrelere erişme yöntemi
  const { id } = await params;

  return NextResponse.json({
    message: "Bir Adet Ürün",
    id: id,
  });
};

export const PATCH = async (req) => {
  // header erişme - v1
  const headerList = await headers();
  const token = headerList.get("Authorization");

  // cookies erişme - v1
  const cookieList = await cookies();
  const lang = cookieList.get("lang").value;

  // seachParams erişme - v1
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category");

  return NextResponse.json({ message: "Ürün Güncellendi - Patch", token, lang, category });
};

export const PUT = async (req) => {
  // header erişme - v2
  const token = req.headers.get("Authorization");

  // cookies erişme - v2
  const lang = req.cookies.get("lang").value;

  // seachParams erişme - v2
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  return NextResponse.json({ message: "Ürün Güncellendi - Put", token, lang, category });
};
