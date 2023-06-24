import type { NextPage } from "next";
import { useRouter } from "next/router";
import { getAllRecipeIds, getRecipeById } from "../../lib/recipes";
import Image from "next/image";
import { useState } from "react";
import DeleteRecipeModal from "../../components/recipeView/deleteModal";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

export async function getStaticPaths() {
  const paths = await getAllRecipeIds();
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  const recipe = await getRecipeById(params.recipeId);
  return {
    props: {
      recipe: JSON.parse(JSON.stringify(recipe)),
    },
  };
}

const Recipe: NextPage = ({ recipe }: any) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [openDelete, setOpenDelete] = useState(false);
  const { recipeId } = router.query;

  const userHasValidSession = Boolean(session);
  const recipeBelongsToUser = session?.user?.email === recipe.author.email;

  async function deleteRecipe(): Promise<void> {
    await fetch(`/api/recipes/${recipeId}`, {
      method: "DELETE",
    });
    router.back();
  }

  async function editRecipe(): Promise<void> {
    await router.push(`/recipes/edit/${recipeId}`);
  }

  const dateCreated = dayjs(recipe.createdAt).format("MMMM D, YYYY");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-2">
      <p className="text-4xl font-bold text-gray-900 p-1">{recipe.title}</p>
      <p className="text-md text-gray-500 mt-2">
        Recipe by {recipe.author.name} | Published on {dateCreated}
      </p>
      {recipe.categories.length > 0 && (
        <div className="flex flex-wrap">
          {recipe.categories.map((category: any, index: number) => (
            <div
              key={index}
              className="flex-initial mr-4 mt-4 p-2 shadow-sm rounded-lg bg-indigo-100 text-md font-medium text-indigo-800 text-center"
            >
              {category}
            </div>
          ))}
        </div>
      )}
      {recipe.photo && recipe.photo !== "" && (
        <div className="mx-auto max-w-4xl m-4">
          <Image
            src={recipe.photo}
            alt={recipe.title}
            height={300}
            width={300}
          />
        </div>
      )}
      <p className="text-2xl text-gray-500 mt-2">Description</p>
      <p className="text-gray-900">{recipe.description}</p>
      <p className="text-2xl text-gray-500 mt-2">Ingredients</p>
      <ul className="list-disc list-inside">
        {recipe.ingredients.map((ingredient: string, index: number) => (
          <li key={index} className="text-gray-900 p-1">
            {ingredient}
          </li>
        ))}
      </ul>
      <p className="text-2xl text-gray-500 mt-2">Steps</p>
      <ol className="list-decimal list-inside">
        {recipe.steps.map((step: string, index: number) => (
          <li key={index} className="text-gray-900 p-1">
            {step}
          </li>
        ))}
      </ol>
      {userHasValidSession && recipeBelongsToUser && (
        <div className="flex">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-gray-400 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-2"
            onClick={() => editRecipe()}
          >
            Edit
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-red-500 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-2"
            onClick={() => setOpenDelete(true)}
          >
            Delete
          </button>
        </div>
      )}
      <DeleteRecipeModal
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={deleteRecipe}
      />
    </div>
  );
};

export default Recipe;