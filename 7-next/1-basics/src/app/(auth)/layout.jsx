"use client";

import Link from "next/link";
import { useState } from "react";

const Layout = ({ children }) => {
  const [name, setName] = useState("");

  // layout'u yetkilendirme için de kullanabiliriz
  if (false) return <h1>Bu sayfayı Görüntüleyemezsin</h1>;

  return (
    <div className="grid grid-cols-[200px_1fr] gap-2">
      <aside className="border rounded-md p-5 flex flex-col gap-5">
        <h3>Selam, {name}</h3>
        <input type="text" placeholder="adını yaz..." onChange={(e) => setName(e.target.value)} />

        <Link href="/register">Kaydol</Link>
        <Link href="/login">Giriş Yap</Link>
        <Link href="/profile">Profil</Link>
      </aside>

      <div>{children}</div>
    </div>
  );
};

export default Layout;
