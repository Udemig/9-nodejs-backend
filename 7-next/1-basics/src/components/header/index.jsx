import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between p-5 md:px-10 border-b">
      <h1 className="text-lg font-bold">NEXT</h1>

      <nav className="flex gap-5">
        <Link href="/">Anasayfa</Link>
        <Link href="/products">Ürünler</Link>
        <Link href="/profile">Profil</Link>
        <Link href="/gallery">Galeri</Link>
        <Link href="/dashboard">Admin</Link>
      </nav>
    </header>
  );
};

export default Header;
