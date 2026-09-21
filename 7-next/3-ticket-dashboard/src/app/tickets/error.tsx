"use client";

import { FC } from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const Error: FC<Props> = ({ error, reset }) => {
  return (
    <div className="h-full grid place-items-center">
      <div className="text-center space-y-5">
        <h1 className="font-semibold text-lg">Üzgünüz bir sorun oluştu</h1>
        <p className="bg-red-600/20 p-2 rounded-lg">{error.message}</p>
        <button className="border rounded-lg py-2 px-4" onClick={reset}>
          Tekrar Dene
        </button>
      </div>
    </div>
  );
};

export default Error;
