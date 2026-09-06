// Url parametre ve arama parametreleri bileşenlere promise formatında params ve searchParams propu olarak gelir ve bileşen içerisinde async await ile kullanırız
const Detail = async ({ params, searchParams }) => {
  const { id } = await params;
  const { name } = await searchParams;

  return (
    <div className="text-3xl text-center space-y-10">
      <h1>{name}</h1>
      <h1>{id}. Ürünün Detay Sayfası</h1>
    </div>
  );
};

export default Detail;
