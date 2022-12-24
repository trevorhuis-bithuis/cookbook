import { useState } from "react"
import Ingredient from "../../interfaces/Ingredient"
import StepsInput from "./stepsInput"
import IngredientsInput from "./ingredientsInput"
import { Category } from '@prisma/client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function NewRecipeForm() {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState<Category>(Category.Dinner)
    const [description, setDescription] = useState('')
    const [images, setImages] = useState<string[]>([])
    const [ingredients, setIngredients] = useState<Ingredient[]>([{
        name: '',
        quantity: 0,
        unit: '',
    }])
    const [steps, setSteps] = useState<string[]>(['',])

    const router = useRouter()

    const { data: session } = useSession()

    const categories = Object.values(Category)

    const saveRecipe = async () => {
        const postData = async () => {
            const data = {
                title,
                category,
                favorite: false,
                steps,
                description,
                images,
                ingredients,
                authorEmail: session!.user!.email,
            };

            const response = await fetch("/api/recipe", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.json();
        };
        postData().then((data) => {
            router.push(`/recipe/${data.recipe.id}`);
        });
    }

    return (
        <div className="mt-4">
            <form className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Create a New Recipe</h3>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="recipe-title" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="recipe-title"
                                        id="recipe-title"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    id="location"
                                    name="location"
                                    className="mt-1 block w-48 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value as Category)}
                                >
                                    {categories.map((category, index) => {
                                        return (<option key={index}>{category}</option>
                                        )
                                    }
                                    )}
                                </select>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="recipe-description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="recipe-description"
                                        name="recipe-description"
                                        rows={4}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">Optional</p>
                            </div>

                            <StepsInput steps={steps} setSteps={setSteps} />

                            <IngredientsInput ingredients={ingredients} setIngredients={setIngredients} />

                            {/* <ImagesInput images={images} setImages={setImages} /> */}
                        </div>
                    </div>

                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={saveRecipe}
                            disabled={title === '' || description === '' || (steps.length === 0 || steps[0] === '') || (ingredients.length === 0 || ingredients[0].name === '')}
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 disabled:bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>

    )
}
