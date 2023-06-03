import { useState } from "react";
import RecipeForm from "./recipeForm/recipeForm";

export default function NewRecipe() {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [steps, setSteps] = useState<string[]>([""]);
  const [isSending, setIsSending] = useState(false);

  const createRecipe = async () => {
    console.log("createRecipe");
  };

  return (
    <RecipeForm
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      categories={categories}
      setCategories={setCategories}
      imageUrl={imageUrl}
      setImageUrl={setImageUrl}
      ingredients={ingredients}
      setIngredients={setIngredients}
      steps={steps}
      setSteps={setSteps}
      saveRecipe={createRecipe}
      isSending={isSending}
      isEdit={false}
    />
  );
}
