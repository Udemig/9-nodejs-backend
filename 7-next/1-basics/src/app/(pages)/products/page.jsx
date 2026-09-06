import Link from "next/link";

const Products = () => {
  return (
    <div className="text-3xl text-center flex flex-col gap-10">
      <h1>Ürünler Sayfası</h1>

      <Link href="/products/1">Ürün - 1</Link>
      <Link href="/products/2">Ürün - 2</Link>
      <Link href="/products/3">Ürün - 3</Link>
      <Link href="/products/4">Ürün - 4</Link>
      <Link href="/products/5">Ürün - 5</Link>
      <Link href="/products/6">Ürün - 6</Link>
      <Link href="/products/7">Ürün - 7</Link>
      <Link href="/products/8">Ürün - 8</Link>
    </div>
  );
};

export default Products;
