import type { NextPage } from "next";
import NewRecipe from "../../components/newRecipe";

const CreateRecipe: NextPage = () => {

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <NewRecipe />
    </div>
  );
};

export default CreateRecipe;
