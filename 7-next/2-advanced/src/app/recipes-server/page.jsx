import { delay, fetchRecipes } from "@/utils/service";
import Image from "next/image";
import Link from "next/link";

// export const dynamic = "force-dynamic";
export const revalidate = 60;

const RecipesServer = async () => {
  await delay();
  const { recipes } = await fetchRecipes();

  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">Tarifler</h1>

      {recipes.map((recipe) => (
        <Link
          key={recipe.id}
          href={`/recipes-server/${recipe.id}`}
          className="flex gap-4 mt-5 p-4 rounded-md border"
        >
          <Image src={recipe.image} alt={recipe.name} width={100} height={100} />

          <div>
            <h1>{recipe.name}</h1>
            <h1>{recipe.cuisine}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipesServer;
