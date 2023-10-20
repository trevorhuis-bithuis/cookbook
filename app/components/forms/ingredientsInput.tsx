type ingredientsInputProps = {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
};

export default function IngredientsInput(props: ingredientsInputProps) {
  const { ingredients, setIngredients } = props;

  function addIngredient() {
    const newIngredients = [...ingredients];
    newIngredients.push("");
    setIngredients(newIngredients);
  }

  function updateIngredient(index: number, ingredient: string) {
    const newIngredients = [...ingredients];
    newIngredients[index] = ingredient;
    setIngredients(newIngredients);
  }

  function removeIngredient(index: number) {
    return () => {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    };
  }

  return (
    <div className="sm:col-span-6 ">
      <p className="text-md mb-4 block font-medium text-gray-700">
        Ingredients
      </p>
      {ingredients.map((ingredient, index) => {
        return (
          <div className="my-2 flex w-full space-x-2 md:w-1/2" key={index}>
            <div className="flex-1">
              <div>
                <label
                  htmlFor="ingredient"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ingredient {index + 1}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="ingredient"
                    className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="1/4 cup butter"
                    onChange={(e) => {
                      updateIngredient(index, e.target.value);
                    }}
                    value={ingredient}
                  />
                </div>
              </div>
            </div>
            <div className="flex-none content-end">
              <button
                className="mt-8"
                type="button"
                onClick={removeIngredient(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={addIngredient}
      >
        Add
      </button>
    </div>
  );
}
