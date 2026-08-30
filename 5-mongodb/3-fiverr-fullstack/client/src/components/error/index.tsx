import type { FC } from "react";

interface Props {
  message: string;
  refetch?: () => void;
}

const Error: FC<Props> = ({ message, refetch }) => {
  return (
    <div className="warning bg-red-500/70">
      <p className="font-semibold">{message || "Üzgünüz bir hata oluştu"}</p>

      <p className="my-5">Lütfen daha sonra tekrar deneyiniz</p>

      {refetch && (
        <button onClick={refetch} className="border rounded-md px-2 py-1">
          Tekrar Dene
        </button>
      )}
    </div>
  );
};

export default Error;
