import StepsInput from "./stepsInput";
import IngredientsInput from "./ingredientsInput";
import CategoriesInput from "./categoriesInput";
import DescriptionInput from "./descriptionInput";
import ImagesInput from "./imagesInput";
import TitleInput from "./titleInput";

interface recipeFormProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  categories: string[];
  setCategories: (categories: string[]) => void;
  imageUrl: string;
  setImageUrl: (image: string) => void;
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
  steps: string[];
  setSteps: (steps: string[]) => void;
  saveRecipe: () => void;
  isSending: boolean;
  isEdit: boolean;
}

export default function RecipeForm(props: recipeFormProps) {
  const {
    isSending,
    title,
    setTitle,
    description,
    setDescription,
    categories,
    setCategories,
    imageUrl,
    setImageUrl,
    ingredients,
    setIngredients,
    steps,
    setSteps,
    saveRecipe,
  } = props;

  if (isSending) {
    return <div className="mt-4">Is Sending...</div>;
  }

  return (
    <div className="mt-4">
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Create a New Recipe
              </h3>
            </div>

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
          </div>
        </div>

        {/* <CancelAndSaveButtons
                    handleCancel={handleCancel}
                    handleSave={handleSave}
                /> */}
      </form>
    </div>
  );
}
