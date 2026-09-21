import { getStatistics } from "@/utils/service";
import { FC } from "react";

const Statistics: FC = async () => {
  const { data } = await getStatistics();

  return (
    <div className="py-4 grid grid-cols-2 md:grid-cols-4 gap-4 px-6 bg-zinc-900 border-b border-zinc-800">
      <div className="bg-blue-900/20 text-blue-400 p-3 rounded-lg">
        <p className="text-2xl font-bold">{data.overview.totalTickets}</p>
        <p className="text-blue-400/70 text-xs">Aktif Ticket</p>
      </div>
      <div className="bg-green-900/20 text-green-400 p-3 rounded-lg">
        <p className="text-2xl font-bold">{data.overview.completedTickets}</p>
        <p className="text-green-400/70 text-xs">Çözüldü</p>
      </div>
      <div className="bg-yellow-900/20 text-yellow-400 p-3 rounded-lg max-lg:hidden">
        <p className="text-2xl font-bold">{data.distributions.byStatus.Beklemede}</p>
        <p className="text-yellow-400/70 text-xs">Beklemede</p>
      </div>
      <div className="bg-purple-900/20 text-purple-400 p-3 rounded-lg max-lg:hidden">
        <p className="text-2xl font-bold">{data.overview.averagePriority}</p>
        <p className="text-purple-400/70 text-xs">Ort. Öncelik</p>
      </div>
    </div>
  );
};

export default Statistics;
