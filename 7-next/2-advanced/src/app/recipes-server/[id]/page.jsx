import { delay, fetchRecipes, fetchRecipesById } from "@/utils/service";
import Image from "next/image";
import Link from "next/link";

// SSG
// Bu fonksiyondan return ettiğimiz parametreler için statik sayfalar oluşur
export const generateStaticParams = async () => {
  // api'dan tarif verisini alır
  const { recipes } = await fetchRecipes();

  return recipes.map((r) => ({ id: String(r.id) }));
};

const Page = async ({ params }) => {
  const { id } = await params;
  await delay();
  const recipe = await fetchRecipesById(id);

  return (
    <div className="text-4xl">
      <Link href="/recipes-server" className="text-blue-500 hover:underline">
        Geri
      </Link>

      <Image
        src={recipe.image}
        alt={recipe.name}
        width={300}
        height={300}
        className="rounded-lg mx-auto"
      />

      <h1 className="text-4xl text-center mt-5">{recipe.name}</h1>
      <h1 className="text-4xl text-center mt-5">Mutfak: {recipe.cuisine}</h1>
      <h1 className="text-4xl text-center mt-5">Zorluk: {recipe.difficulty}</h1>
    </div>
  );
};

export default Page;
