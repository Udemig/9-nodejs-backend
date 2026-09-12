"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const RecipesClient = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = () => {
    setIsLoading(true);

    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (isLoading) return <h1>Yükleniyor...</h1>;

  if (error)
    return (
      <h1>
        Hata! <button onClick={fetchRecipes}>Tekrar Dene</button>
      </h1>
    );

  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">Tarifler</h1>

      {recipes.map((recipe) => (
        <div key={recipe.id} className="flex gap-4 mt-5 p-4 rounded-md border">
          <Image src={recipe.image} alt={recipe.name} width={100} height={100} />

          <div>
            <h1>{recipe.name}</h1>
            <h1>{recipe.cuisine}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipesClient;
