import Link from "next/link";

const Page = () => {
  return (
    <div className="text-3xl text-center my-40 space-y-20">
      <h1>Page1</h1>

      <Link href="/page1/page2">Page2'ye Git</Link>
    </div>
  );
};

export default Page;
