import { ShieldAlert } from "lucide-react";

const Error = ({ message, refetch }) => {
  return (
    <div className="flex items-center justify-center min-h-100 px-4">
      <div className="glass rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <ShieldAlert className="mx-auto mb-3 size-14 text-red-400" />

        <h1 className="text-2xl font-bold mb-3">Üzgünüz bir sorun oluştu</h1>

        <p className="text-red-400 mb-6">{message}</p>

        <button onClick={refetch} className="btn-gradient px-6 py-3 rounded-xl cursor-pointer">
          Tekrar Dene
        </button>
      </div>
    </div>
  );
};

export default Error;
