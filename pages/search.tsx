import type { NextPage } from "next";
import RecipeGrid from "../components/recipeGrid";
import { useEffect, useState } from "react";

const Search: NextPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [noneFound, setNoneFound] = useState<boolean | null>(null);

  function searchRecipes() {
    setLoading(true);

    async function getRecipes() {
      const fetchedRecipes = await fetch(
        `api/recipes?search=${searchText}&categories=${selectedCategories}&page=${page}`
      );

      const recipes = await fetchedRecipes.json();

      setRecipes(recipes);

    }

    getRecipes();

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="text-xl mt-6">Recipes</p>
      <div className="flex flex-col md:flex-row items-center">
        <div className="mt-4 basis-1/2 mx-2">
          <label htmlFor="search" className="text-sm font-medium text-gray-700">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 basis-1/4">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All</option>
            {categories!.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-10 basis-1/4">
          <button
            type="button"
            className="inline-flex items-center mx-2 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={searchRecipes}
          >
            Search
          </button>
        </div>
      </div>

      {recipes.length === 0 && noneFound && (
        <p className="text-xl mt-6">No recipes found</p>
      )}
      {recipes.length > 0 && (
        <>
          <div className="py-4 mt-6">
            <RecipeGrid recipes={recipes} />
          </div>

          <nav
            className="flex items-center border-gray-200 bg-white px-4 py-3 sm:px-6"
            aria-label="Pagination"
          >
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{page * 8 - 7}</span> to{" "}
                <span className="font-medium">
                  {page * 8 > recipes.length ? recipes.length : page * 8}
                </span>{" "}
                of <span className="font-medium">{recipes.length}</span> results
              </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
              <button
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                    searchRecipes();
                  }
                }}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (page < Math.floor(recipes.length / 8)) {
                    setPage(page + 1);
                    searchRecipes();
                  }
                }}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </nav>
        </>
      )}
    </div>
  );
};

export default Search;
