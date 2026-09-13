import { NextResponse } from "next/server";

export function middleware(req) {
  // 1. Logging - Tüm istekleri logla
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.nextUrl.pathname}`);

  // 2. CORS Headers
  req.headers.set("cors", "gerekli headerlar");

  // 3. Güvenlik Headers
  req.headers.set("helmet", "gerekli headerlar");

  // 4. Route Koruması
  if ("kullanıcı admin değilse") {
    // return NextResponse.redirect("http://localhost:3000");
  }

  // Middleware'den sonraki adıma geç
  return NextResponse.next();
}

// middleware'in hangi route ve sayfalarda çalışacağını belirliyoruz
export const config = {
  matcher: ["/api/:path*", "/recipes-server"],
};
