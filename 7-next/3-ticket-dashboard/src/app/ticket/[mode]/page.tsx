import Form from "@/components/form";
import { Ticket } from "@/types";
import { getTicketById } from "@/utils/service";
import { FC } from "react";

interface Props {
  params: Promise<{
    mode: string;
  }>;
}

const Page: FC<Props> = async ({ params }) => {
  // url'deki parametreye eriş
  const { mode } = await params;

  // aldığımız parametreye göre form'un hanngi modda çalışacağının belirle
  const isEditMode = mode !== "add";

  // güncellenceki eleman
  let editItem: Ticket | null = null;

  // eğer güncellememe modundaysak güncellenicek ticket'ı al
  if (isEditMode) {
    editItem = (await getTicketById(mode)).ticket;
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-2xl text-zinc-500">
        {isEditMode ? "Ticket'ı Güncelle" : "Ticket Oluştur"}
      </h1>

      <Form editItem={editItem} isEditMode={isEditMode} />
    </div>
  );
};

export default Page;
