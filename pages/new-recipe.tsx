import type { NextPage } from 'next'
import NewRecipeForm from '../components/newRecipeForm/newRecipeForm'

const NewRecipe: NextPage = () => {
    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <NewRecipeForm />
        </div>
    )
}

export default NewRecipe
