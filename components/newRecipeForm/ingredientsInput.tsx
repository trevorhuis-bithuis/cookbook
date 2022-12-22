import Ingredient from "../../types/Ingredient";

type ingredientsInputProps = {
    ingredients: Ingredient[];
    setIngredients: (ingredients: Ingredient[]) => void;
}

export default function IngredientsInput(props: ingredientsInputProps) {
    const { ingredients, setIngredients } = props;



    function addIngredient() {
        setIngredients([...ingredients, {
            name: '',
            quantity: '',
            unit: '',
        }])
    }

    function updateIngredientName(index: number, value: string) {
        const newIngredients = [...ingredients]
        newIngredients[index].name = value
        setIngredients(newIngredients)
    }

    function updateIngredientUnit(index: number, value: string) {
        const newIngredients = [...ingredients]
        newIngredients[index].unit = value
        setIngredients(newIngredients)
    }

    function updateIngredientQuantity(index: number, value: string) {
        const newIngredients = [...ingredients]
        newIngredients[index].quantity = value
        setIngredients(newIngredients)
    }

    function removeIngredient(index: number) {
        console.log(index);
        return () => {
            const newIngredients = [...ingredients]
            newIngredients.splice(index, 1)
            setIngredients(newIngredients)
        }
    }

    return (
        <div className="sm:col-span-6 ">
            <p className="block text-md font-medium text-gray-700 mb-4">
                Ingredients
            </p>
            {ingredients.map((ingredient, index) => {
                return (
                    <div className="flex my-2 w-1/2 space-x-2" key={index}>
                        <div className="flex-1">
                            <div>
                                <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700">
                                    Ingredient
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="ingredient"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Butter"
                                        onChange={(e) => { updateIngredientName(index, e.target.value) }}
                                        value={ingredient.name}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div>
                                <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700">
                                    Unit
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="ingredient"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Cups"
                                        onChange={(e) => { updateIngredientUnit(index, e.target.value) }}
                                        value={ingredient.unit}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div>
                                <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700">
                                    Quantity
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="ingredient"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="1.25"
                                        onChange={(e) => { updateIngredientQuantity(index, e.target.value) }}
                                        value={ingredient.quantity}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex-none content-center">
                            <button className="m-2" type="button" onClick={removeIngredient(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )
            }
            )}
            <button className="m-2" type="button" onClick={addIngredient}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 border-2 border-indigo-700 rounded-md">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
    )
}