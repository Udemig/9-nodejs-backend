import Link from "next/link";

const Page2 = () => {
  return (
    <div className="text-3xl text-center my-40 space-y-20">
      <h1>Page4</h1>

      <Link href="/page3">Page3'e Dön</Link>
    </div>
  );
};

export default Page2;
