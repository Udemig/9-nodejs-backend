import { fetchRecipes } from "@/utils/service";
import NavLink from "./NavLink";

const Header = async () => {
  const { recipes } = await fetchRecipes();

  return (
    <header className="border-b pb-5 mb-5 flex justify-between">
      <h1 className="font-bold text-2xl">NEXT.js</h1>

      <nav className="text-blue-500 flex gap-4">
        <NavLink href="/form">Form </NavLink>
        <NavLink href="/test">Test </NavLink>
        <NavLink href="/recipes-server">Recipes Server ({recipes.length})</NavLink>
        <NavLink href="/recipes-client">Recipes Client</NavLink>
      </nav>
    </header>
  );
};

export default Header;
