import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-8 py-2">
        <Link to="/" className="flex items-center gap-1 group">
          <div className="relative">
            <img src="/logo-2.png" alt="logo" width={55} height={55} />
            <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-0 group-hover:opacity-40 transition duration-300" />
          </div>

          <h2 className="font-bold text-3xl gradient-text">Filmania</h2>
        </Link>

        <Link
          to="/create"
          className="btn-gradient px-6 py-1.5 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          + Film Oluştur
        </Link>
      </div>
    </header>
  );
};

export default Header;
