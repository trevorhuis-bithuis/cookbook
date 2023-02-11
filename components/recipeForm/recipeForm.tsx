import StepsInput from './stepsInput'
import IngredientsInput from './ingredientsInput'
import CategoriesInput from './categoriesInput'
import ImagesInput from './imagesInput'

interface recipeFormProps {
    title: string
    setTitle: (title: string) => void
    description: string
    setDescription: (description: string) => void
    categories: string[]
    setCategories: (categories: string[]) => void
    imageFiles: any[]
    setImageFiles: (images: any[]) => void
    ingredients: string[]
    setIngredients: (ingredients: string[]) => void
    steps: string[]
    setSteps: (steps: string[]) => void
    saveRecipe: () => void
    isSending: boolean
}

export default function RecipeForm(props: recipeFormProps) {
    const {
        isSending,
        title,
        setTitle,
        description,
        setDescription,
        categories,
        setCategories,
        imageFiles,
        setImageFiles,
        ingredients,
        setIngredients,
        steps,
        setSteps,
        saveRecipe,
    } = props

    if (isSending) {
        return <div className="mt-4">Is Sending...</div>
    }

    return (
        <div className="mt-4">
            <form className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Create a New Recipe
                            </h3>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="recipe-title"
                                    className="block text-sm font-medium text-gray-700"
                                >
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
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <CategoriesInput
                                categories={categories}
                                setCategories={setCategories}
                            />

                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="recipe-description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="recipe-description"
                                        name="recipe-description"
                                        rows={4}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Optional
                                </p>
                            </div>

                            <StepsInput steps={steps} setSteps={setSteps} />

                            <IngredientsInput
                                ingredients={ingredients}
                                setIngredients={setIngredients}
                            />

                            <ImagesInput imageFiles={imageFiles} setImageFiles={setImageFiles} />
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
                            disabled={
                                title === '' ||
                                description === '' ||
                                steps.length === 0 ||
                                steps[0] === '' ||
                                ingredients.length === 0 ||
                                ingredients[0] === ''
                            }
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
