import { Recipe } from "@prisma/client"
import RecipeBox from "./recipeBox"
import { useState } from "react"

interface RecipeGridProps {
    recipes: Recipe[]
}

export default function RecipeGrid(props: RecipeGridProps) {
    const { recipes } = props

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {recipes.map((recipe) => (
                <li key={recipe.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                    <RecipeBox recipe={recipe} />
                </li>
            ))}
        </ul>
    )

}