import { type NextPage } from "next";
import SearchBar from "@/components/searchBar";
import RecipeGrid from "@/components/recipeGrid";
import Paginator from "@/components/paginator";
import { useEffect, useState } from "react";

const RecipeSearch: NextPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [recipeCount, setRecipeCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [noneFound, setNoneFound] = useState<boolean | null>(null);

  function searchRecipes() {
    setLoading(true);

    async function getRecipes() {
      const fetchedRecipes = await fetch(
        `/api/recipes/search?search=${searchText}&category=${selectedCategory}&page=${page - 1
        }`
      );
      const data = await fetchedRecipes.json();
      setRecipeCount(data.count);
      setRecipes(data.recipes);
    }

    getRecipes();

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="text-xl mt-6">Recipes</p>
      <SearchBar
        setSearchText={setSearchText}
        setSelectedCategory={setSelectedCategory}
        search={searchRecipes}
        page={page}
      />

      {recipeCount === 0 && noneFound && (
        <p className="text-xl mt-6">No recipes found</p>
      )}
      {recipeCount > 0 && (
        <>
          <div className="py-4 mt-6">
            <RecipeGrid recipes={recipes} />
          </div>

          <Paginator
            page={page}
            setPage={setPage}
            search={searchRecipes}
            length={recipeCount}
          />
        </>
      )}
    </div>
  );
};

export default RecipeSearch;