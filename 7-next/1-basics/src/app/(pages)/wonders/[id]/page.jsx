import { data } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const Detail = async ({ params }) => {
  const { id } = await params;

  const wonder = data.find((item) => item.id === id);

  // veri bulunamazsa 404 sayfasını ekrana bas
  if (!wonder) return notFound();

  return (
    <div className="min-h-screen mx-auto text-3xl">
      <div className="w-3/4 lg:w-1/2 mx-auto">
        <Link href="/wonders">Geri</Link>

        <h1 className="text-center text-3xl font-bold mt-10 mb-5">{wonder.name}</h1>

        <Image
          src={wonder.src}
          alt={wonder.name}
          className="w-full aspect-square object-cover rounded-md"
        />

        <div className="my-10">
          <h3 className="text-lg">Fotoğrafçı</h3>
          <span>{wonder.photographer}</span>
        </div>

        <div className="my-10">
          <h3 className="text-lg">Lokasyon</h3>
          <span>{wonder.location}</span>
        </div>
      </div>
    </div>
  );
};

export default Detail;
