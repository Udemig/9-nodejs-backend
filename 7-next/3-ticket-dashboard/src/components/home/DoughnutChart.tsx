"use client";

import { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

interface Props {
  values: Record<string, number>;
}

const DoughnutChart: FC<Props> = ({ values }) => {
  const data = {
    labels: Object.keys(values || {}),
    datasets: [
      {
        label: "Ticket Sayısı",
        data: Object.values(values || {}),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-700 hover:shadow-md grid place-items-center max-h-93.25 h-full">
      <Doughnut data={data} className="size-full p-6" />
    </div>
  );
};

export default DoughnutChart;
