import type { NextPage } from "next";
import { useState } from "react";
import TitleInput from "../../components/forms/titleInput";
import CategoriesInput from "../../components/forms/categoriesInput";
import DescriptionInput from "../../components/forms/descriptionInput";
import StepsInput from "../../components/forms/stepsInput";
import IngredientsInput from "../../components/forms/ingredientsInput";
import ImagesInput from "../../components/forms/imagesInput";
import CancelAndSaveButtons from "../../components/forms/cancelAndSaveButtons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CheckIcon } from "@heroicons/react/24/outline";

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

          {imageUrl && (
            <div className="items-center mx-auto">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">Upload successful</div>
            </div>
          )}
          <CancelAndSaveButtons
            handleCancel={handleCancel}
            handleSaveRecipe={handleSave}
            isSaveDisabled={
              title !== "" &&
                description !== "" &&
                categories.length !== 0 &&
                steps[0] !== "" &&
                ingredients[0] !== ""
                ? false
                : true
            }
          />
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
