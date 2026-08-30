import type { FC } from "react";
import { Link } from "react-router-dom";

const Links: FC = () => {
  return (
    <div className="flex items-center gap-2 relative group">
      <Link to="/login" className="transition hover:text-green-500">
        Giriş Yap
      </Link>
      <Link
        to="/register"
        className="transition border rounded border-green-500 py-1 px-2 hover:bg-green-500 hover:text-white"
      >
        Kayıt Ol
      </Link>
    </div>
  );
};

export default Links;
