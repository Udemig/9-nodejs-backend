import { statusColor } from "@/utils/constants";
import { FC } from "react";

interface Props {
  status: "Beklemede" | "Devam Ediyor" | "Çözüldü";
}

const StatusBadge: FC<Props> = ({ status }) => {
  return (
    <div
      className={`text-white px-3 py-1 text-xs rounded-full text-shadow-md ${statusColor[status]}`}
    >
      {status}
    </div>
  );
};

export default StatusBadge;
