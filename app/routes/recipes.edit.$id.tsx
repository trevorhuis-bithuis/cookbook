import { useState } from "react";
import {
  CancelAndSaveButton,
  CategoriesInput,
  DescriptionInput,
  ImagesInput,
  IngredientsInput,
  StepsInput,
  TitleInput,
} from "~/components/forms";
import { CheckIcon } from "@heroicons/react/24/outline";
import {
  type ActionArgs,
  type LoaderArgs,
  type LoaderFunction,
  type ActionFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { getRecipe, updateRecipe } from "~/models/recipe.server";
import { requireUserId } from "~/session.server";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderArgs) => {
  await requireUserId(request);
  const id = params.id as string;
  const recipe = await getRecipe(id);

  return recipe;
};

export const action: ActionFunction = async ({
  params,
  request,
}: ActionArgs) => {
  const formData = await request.formData();
  const id = params.id as string;

  const recipe = JSON.parse(formData.get("recipe") as string);

  await updateRecipe(
    id,
    recipe.title,
    recipe.description,
    recipe.ingredients,
    recipe.steps,
    recipe.categories,
    recipe.photoUrl,
  );

  return redirect(`/recipes/${id}`);
};

const UpdateRecipe = () => {
  const recipe = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const submit = useSubmit();

  const [title, setTitle] = useState<string>(recipe.title);
  const [categories, setCategories] = useState<string[]>(
    recipe.categories || [],
  );
  const [description, setDescription] = useState<string>(recipe.description);
  const [imageUrl, setImageUrl] = useState<string>(recipe.photoUrl);
  const [ingredients, setIngredients] = useState<string[]>(
    recipe.ingredients || [],
  );
  const [steps, setSteps] = useState<string[]>(recipe.steps || []);

  function handleCancel() {
    navigate(`/recipes/${recipe._id}`);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let $form = event.currentTarget;
    let formData = new FormData($form);

    let recipe = {
      title,
      description,
      ingredients,
      steps,
      categories,
      photoUrl: imageUrl,
    };

    formData.set("recipe", JSON.stringify(recipe));

    submit(formData, {
      // @ts-ignore
      method: $form.getAttribute("method") ?? $form.method,
      action: $form.getAttribute("action") ?? $form.action,
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mt-4">
        <Form
          onSubmit={handleSubmit}
          method="post"
          className="space-y-8 divide-gray-200"
        >
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Create a New Recipe
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
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
            <div className="mx-auto items-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">Upload successful</div>
            </div>
          )}
          <CancelAndSaveButton
            handleCancel={handleCancel}
            isSaveDisabled={false}
          />
        </Form>
      </div>
    </div>
  );
};
// isSaveDisabled={
//     title !== "" &&
//         description !== "" &&
//         categories.length !== 0 &&
//         steps[0] !== "" &&
//         ingredients[0] !== ""
//         ? false
//         : true
export default UpdateRecipe;
