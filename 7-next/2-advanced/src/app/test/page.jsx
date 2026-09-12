"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-10 text-2xl">
      <button onClick={() => router.back()}>Geri</button>
      <button onClick={() => router.forward()}>İleri</button>
      <button onClick={() => router.push("/")}>Push</button>
      <button onClick={() => router.replace("/")}>Replace</button>
      <button onClick={() => router.refresh()}>Yenile</button>
    </div>
  );
};

export default Page;
