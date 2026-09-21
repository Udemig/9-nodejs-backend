import TicketsGrid from "@/components/tickets/TicketsGrid";
import { FC, Suspense } from "react";
import Loading from "./loading";

const Page: FC = () => {
  return (
    <div className="mt-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-100 mb-2">Tickets</h1>
        <p className="text-gray-400">Tüm ticket'larını kategori bazında görüntületin ve yönetin</p>
      </div>

      {/*
       * Normalde loader bütün sayfa içeriğinin yerine ekrana basılır
       * Eğer loader'ın sayfa içerisinde ekrana geliceği konumu ayarlamak istiyorsak bu yöntemi kullanırız
       */}
      <Suspense fallback={<Loading />}>
        <TicketsGrid />
      </Suspense>
    </div>
  );
};

export default Page;
