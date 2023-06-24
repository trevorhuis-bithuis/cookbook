import type { NextPage } from "next";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  CancelAndSaveButton,
  CategoriesInput,
  DescriptionInput,
  ImagesInput,
  IngredientsInput,
  StepsInput,
  TitleInput,
} from "@/components/forms";
import SearchBar from "@/components/SearchBar";
import Paginator from "@/components/Paginator";
import RecipeList from "@/components/RecipeList";

const CreateMenu: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedRecipes, setSelectedRecipes] = useState<[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleCancel() {
    console.log("cancel");
  }

  async function handleSave() {
    const recipeIds = selectedRecipes.map((recipe) => recipe.id);
    const data = await fetch("/api/menus", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        recipes: recipeIds,
        authorEmail: session!.user!.email,
      }),
    });
    const menu = await data.json();

    router.push(`/menus/${menu.id}`);
  }

  function searchRecipes() {
    setIsLoading(true);

    async function getRecipes() {
      const fetchedRecipes = await fetch(
        `/api/recipes/search?search=${searchText}&category=${selectedCategory}&page=${
          page - 1
        }`
      );
      const recipes = await fetchedRecipes.json();
      setRecipes(recipes);
    }

    getRecipes();
    setIsLoading(false);
  }

  function addRecipe(recipe: any) {
    setSelectedRecipes([...selectedRecipes, recipe]);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mt-4">
        <form className="space-y-8 divide-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Create a New Menu
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <TitleInput title={title} setTitle={setTitle} />

            <DescriptionInput
              description={description}
              setDescription={setDescription}
            />
          </div>

          <div className="mt-4">
            <h3 className="text-md font-medium leading-6 text-gray-900">
              Selected Recipes
            </h3>
            <ul>
              {selectedRecipes.map((recipe) => (
                <li key={recipe.id}>- {recipe.title}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Add More Recipes
            </h3>
          </div>

          <SearchBar
            setSearchText={setSearchText}
            setSelectedCategory={setSelectedCategory}
            search={searchRecipes}
            page={page}
          />

          {recipes.length > 0 && (
            <>
              <RecipeList recipes={recipes} addRecipe={addRecipe} />
              <Paginator
                page={page}
                setPage={setPage}
                isLoading={isLoading}
                recipeLength={recipes.length}
              />
            </>
          )}

          <CancelAndSaveButton
            handleCancel={handleCancel}
            handleSaveRecipe={handleSave}
            isSaveDisabled={
              title !== "" && description !== "" && recipes.length !== 0
                ? false
                : true
            }
          />
        </form>
      </div>
    </div>
  );
};

export default CreateMenu;
