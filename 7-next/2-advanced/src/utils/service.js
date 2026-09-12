export const fetchRecipes = async () => {
  const res = await fetch("https://dummyjson.com/recipes");

  return res.json();
};

export const fetchRecipesById = async (id) => {
  const res = await fetch(`https://dummyjson.com/recipes/${id}`);

  return res.json();
};

export const delay = (ms = 3000) => new Promise((res) => setTimeout(res, ms));
