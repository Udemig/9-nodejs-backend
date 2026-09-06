import delay from "@/utils/delay";

const Revenue = async () => {
  await delay(2000);
  throw new Error("Veriler alınamadı");

  return <div>Revenue</div>;
};

export default Revenue;
