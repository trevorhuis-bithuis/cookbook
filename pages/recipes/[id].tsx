import type { NextPage } from 'next'
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getAllRecipeIds, getRecipeData } from "../../lib/recipes";
import { useState } from 'react';
import DeleteRecipeModal from '../../components/recipeView/deleteModal';


export async function getStaticPaths() {
    const paths = await getAllRecipeIds()
    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }: any) {
    const recipe = await getRecipeData(params.id)
    return {
        props: {
            recipe
        }
    }
}

const Recipe: NextPage = ({ recipe }: any) => {
    const { data: session, status } = useSession()
    const [openDelete, setOpenDelete] = useState(false)

    const router = useRouter()
    const { id } = router.query


    if (status === 'loading') {
        return <div>Authenticating ...</div>
    }
    const userHasValidSession = Boolean(session)
    const recipeBelongsToUser = session?.user?.email === recipe.author.email

    async function deleteRecipe(): Promise<void> {
        await fetch(`/api/recipes/${id}`, {
            method: "DELETE",
        });
        router.back()
    }

    async function editRecipe(): Promise<void> {
        await router.push(`/recipes/edit/${id}`)
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-2">
            <p className="text-4xl font-bold text-gray-900 p-1">
                {recipe.title}
            </p>
            <p className="text-2xl text-gray-500 mt-2">Description</p>
            <p className="text-gray-900">{recipe.description}</p>
            <p className="text-2xl text-gray-500 mt-2">Ingredients</p>
            <ul className="list-disc list-inside">
                {recipe.ingredients.map((ingredient: any, index: number) => (
                    <li key={index} className="text-gray-900 p-1">{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
                ))}
            </ul>
            <p className="text-2xl text-gray-500 mt-2">Steps</p>
            <ol className="list-decimal list-inside">
                {recipe.steps.map((step: string, index: number) => (
                    <li key={index} className="text-gray-900 p-1">{step}</li>
                ))}
            </ol>
            {userHasValidSession && recipeBelongsToUser && <div className="flex">
                <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-gray-400 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-2"
                    onClick={() => editRecipe()}
                >
                    Edit
                </button><button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-red-500 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-2"
                    onClick={() => setOpenDelete(true)}
                >
                    Delete
                </button>
            </div>}
            <DeleteRecipeModal open={openDelete} setOpen={setOpenDelete} onDelete={deleteRecipe} />

        </div >
    );
};

export default Recipe;
