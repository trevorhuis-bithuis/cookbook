import type { InferGetServerSidePropsType, NextPage } from 'next'
import { GetServerSideProps } from 'next'

type Data = { recipe: any }

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (context) => {
    const res = await fetch(`http://localhost:3000/api/recipe/${context.query.id}`)
    const data: Data = await res.json()

    return {
        props: {
            data,
        },
    }
}

const RecipeSingle = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const recipe = props.data.recipe

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
                {recipe.steps.map((step: any, index: number) => (
                    <li key={index} className="text-gray-900 p-1">{step}</li>
                ))}
            </ol>
        </div >
    )
}

export default RecipeSingle