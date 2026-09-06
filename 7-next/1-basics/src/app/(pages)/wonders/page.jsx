import { data } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

const Wonders = () => {
  return (
    <div className="min-h-screen">
      <h1 className="text-center text-3xl font-bold my-10">Dünya Harikaları</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((item) => (
          <Link href={`/wonders/${item.id}`}>
            <Image
              src={item.src}
              alt={item.name}
              className="w-full aspect-square object-cover rounded-md"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Wonders;
