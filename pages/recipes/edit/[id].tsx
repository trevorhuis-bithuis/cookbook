import type { NextPage } from 'next'
import EditRecipe from '../../../components/recipeForm/editRecipe'

const RecipeEdit: NextPage = () => {

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-2">
            <EditRecipe />
        </div>
    )
}

export default RecipeEdit