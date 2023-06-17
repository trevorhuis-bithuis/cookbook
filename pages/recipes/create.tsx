import type { NextPage } from "next";
import { useState } from "react";
import TitleInput from "../../components/recipeForm/titleInput";
import CategoriesInput from "../../components/recipeForm/categoriesInput";
import DescriptionInput from "../../components/recipeForm/descriptionInput";
import StepsInput from "../../components/recipeForm/stepsInput";
import IngredientsInput from "../../components/recipeForm/ingredientsInput";
import ImagesInput from "../../components/recipeForm/imagesInput";
import CancelAndSaveButtons from "../../components/recipeForm/cancelAndSaveButtons";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

const CreateRecipe: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [steps, setSteps] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createRecipe = async () => {
    console.log("createRecipe");
  };

  function handleCancel() {
    console.log("cancel");
  }

  async function handleSave() {
    const data = await fetch("/api/recipes", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        categories,
        photo: imageUrl,
        ingredients,
        steps,
        authorEmail: session!.user!.email,
      }),
    });
    const recipe = await data.json();

    router.push(`/recipes/${recipe.id}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mt-4">
        <form className="space-y-8 divide-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Create a New Recipe
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <TitleInput title={title} setTitle={setTitle} />

            <CategoriesInput
              categories={categories}
              setCategories={setCategories}
            />

            <DescriptionInput
              description={description}
              setDescription={setDescription}
            />

            <StepsInput steps={steps} setSteps={setSteps} />

            <IngredientsInput
              ingredients={ingredients}
              setIngredients={setIngredients}
            />

            <ImagesInput setImageUrl={setImageUrl} />
          </div>

          <CancelAndSaveButtons
            handleCancel={handleCancel}
            handleSaveRecipe={handleSave}
            isSaveDisabled={false}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
