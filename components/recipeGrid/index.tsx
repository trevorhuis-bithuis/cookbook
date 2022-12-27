import { Recipe } from "@prisma/client"
import RecipeBox from "./recipeBox"
import { useEffect, useState } from "react"

export default function RecipeGrid() {
    const [recipes, setRecipes] = useState<Recipe[] | null>(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('/api/recipes/search')
            .then((res) => res.json())
            .then((data) => {
                console.log(data.recipes)
                setRecipes(data.recipes)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!recipes) return <p>No profile data</p>

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