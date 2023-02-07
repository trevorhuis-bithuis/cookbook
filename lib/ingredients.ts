export function splitIngredientInputString(
    splitIngredientInputString: string
): any {
    try {
        const ingredientArray = splitIngredientInputString.split(' ')
        const ingredient = {
            quantity: ingredientQuantityToNumber(ingredientArray[0]),
            unit: ingredientArray[1],
            name: ingredientArray[2],
        }
        return ingredient
    } catch (error) {
        throw new Error('Not a valid ingredient input')
    }
}

function ingredientQuantityToNumber(ingredient: string): number {
    return eval(ingredient)
}
