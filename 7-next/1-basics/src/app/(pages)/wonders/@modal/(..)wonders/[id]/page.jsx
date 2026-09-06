"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { data } from "@/utils/constants.js";
import Image from "next/image";

const Modal = () => {
  const { id } = useParams();
  const router = useRouter();

  const wonder = data.find((item) => item.id === id);

  if (!wonder) return notFound();

  const handleClose = () => {
    // 1 sayfa geriye yönlendirir
    router.back();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm grid place-items-center">
      <div className="bg-white px-10 pb-10 text-black rounded-sm">
        <div className="flex justify-end my-5 text-lg">
          <button onClick={handleClose}>X</button>
        </div>

        <Image
          src={wonder.src}
          alt={wonder.name}
          className="max-h-75 aspect-square w-full rounded-md object-cover"
        />

        <h1 className="text-center my-5 text-3xl">{wonder.name}</h1>

        <div className="my-10 text-lg">
          <h3>Fotoğrafçı</h3>
          <b>{wonder.photographer}</b>
        </div>
        <div className="my-10 text-lg">
          <h3>Lokasyon</h3>
          <b>{wonder.location}</b>
        </div>
      </div>
    </div>
  );
};

export default Modal;
