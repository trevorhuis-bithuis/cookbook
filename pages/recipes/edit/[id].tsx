import type { NextPage } from "next";
import TitleInput from "../../../components/recipeForm/titleInput";
import CategoriesInput from "../../../components/recipeForm/categoriesInput";
import DescriptionInput from "../../../components/recipeForm/descriptionInput";
import StepsInput from "../../../components/recipeForm/stepsInput";
import IngredientsInput from "../../../components/recipeForm/ingredientsInput";
import ImagesInput from "../../../components/recipeForm/imagesInput";
import { useState } from "react";
import CancelAndSaveButtons from "../../../components/recipeForm/cancelAndSaveButtons";

const RecipeEdit: NextPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<string[]>([""]);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [steps, setSteps] = useState<string[]>([""]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  const cancelEdit = () => {};

  const saveRecipe = () => {};

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-2">
      <div className="mt-4">
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200">
            <>
              <>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Edit Recipe
                </h3>
              </>

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

                <ImagesInput imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
            </>
          </div>

          <CancelAndSaveButtons
            handleCancel={cancelEdit}
            handleSaveRecipe={saveRecipe}
            isSaveDisabled={isSaveDisabled}
          />
        </form>
      </div>
      {/* <EditRecipe /> */}
    </div>
  );
};

export default RecipeEdit;
