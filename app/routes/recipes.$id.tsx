import {
  type ActionArgs,
  type ActionFunction,
  type LoaderFunction,
  type LoaderArgs,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";
import { getRecipe, deleteRecipe } from "~/models/recipe.server";

import DeleteRecipeModal from "~/components/deleteModal";
import { useState } from "react";
import { getUser } from "~/session.server";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderArgs) => {
  const user = await getUser(request);
  const isOwner = user?.isOwner === true;
  const id = params.id as string;

  const recipe = await getRecipe(id);

  return { recipe, isOwner };
};

export const action: ActionFunction = async ({
  params,
  request,
}: ActionArgs) => {
  const id = params.id as string;

  const formData = await request.formData();
  let { _action } = Object.fromEntries(formData);

  if (_action === "_delete") {
    await deleteRecipe(id);

    return redirect("/recipes");
  }

  return redirect(`/recipes/${id}`);
};

const Recipe = () => {
  let { recipe, isOwner } = useLoaderData();
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const submit = useSubmit();

  function handleDelete() {
    submit(
      {
        id: recipe._id,
        _action: "_delete",
      },
      {
        method: "POST",
      },
    );
  }

  return (
    <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex content-center justify-start space-x-2">
        <p className="text-4xl font-bold text-gray-900">{recipe.title}</p>
        {/* <button className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={clsx(
              "h-6 w-6 hover:fill-red-500 active:animate-ping ",
              recipe.isFavorite && "",
            )}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button> */}
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <span className="text-md text-gray-500">
          Published on {recipe.createdAt}
        </span>
        {recipe.categories &&
          recipe.categories.length > 0 &&
          recipe.categories.map((category: any, index: number) => (
            <div
              key={index}
              className="text-md flex-initial rounded-lg bg-indigo-100 p-2 text-center font-medium text-indigo-800 shadow-sm"
            >
              {category}
            </div>
          ))}
      </div>
      {recipe.photoUrl && recipe.photoUrl !== "" && (
        <div className="mb-8 mt-4 mx-right max-w-lg">
          <img
            className="object-contain rounded-md"
            src={recipe.photoUrl}
            alt={recipe.title}
          />
        </div>
      )}

      {recipe.description !== "" && (
        <p className="mt-2 text-2xl text-gray-500">Description</p>
      )}
      <p className="text-gray-900 mt-2">{recipe.description}</p>
      <div className="grid md:grid-cols-3 border-t-2">
        <div className="grid-span-1">
          <p className="mt-2 text-2xl text-gray-500">Ingredients</p>
          <ul className="list-inside list-disc">
            {recipe.ingredients.map((ingredient: string, index: number) => (
              <li key={index} className="p-1 text-gray-900">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid-span-2">
          <p className="mt-2 text-2xl text-gray-500">Steps</p>
          <ol className="list-inside list-decimal">
            {recipe.steps.map((step: string, index: number) => (
              <li key={index} className="p-1 text-gray-900">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
      {isOwner && (
        <div className="flex">
          <Link
            className="m-2 inline-flex items-center rounded-md border border-transparent bg-gray-400 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            to={`/recipes/edit/${recipe._id}`}
          >
            Edit
          </Link>
          <button
            type="button"
            className="m-2 inline-flex items-center rounded-md border border-transparent bg-red-500 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => setOpenDelete(true)}
          >
            Delete
          </button>
        </div>
      )}
      <Form method="POST">
        <DeleteRecipeModal
          open={openDelete}
          setOpen={setOpenDelete}
          itemToDelete={"Recipe"}
          handleDelete={handleDelete}
        />
      </Form>
    </div>
  );
};

export default Recipe;
