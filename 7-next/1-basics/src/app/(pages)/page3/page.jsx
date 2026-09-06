import Link from "next/link";

const Page = () => {
  return (
    <div className="text-3xl text-center my-40 space-y-20">
      <h1>Page3</h1>

      <Link href="/page4">Page4'e Git</Link>
    </div>
  );
};

export default Page;
