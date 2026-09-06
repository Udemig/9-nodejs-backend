const Belgeler = async ({ params }) => {
  const { slug } = await params;

  return (
    <div className="text-3xl text-center">
      <h1>{slug.join("/")}</h1>
    </div>
  );
};

export default Belgeler;
