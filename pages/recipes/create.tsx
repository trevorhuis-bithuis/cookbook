import type { NextPage } from 'next'
import NewRecipe from '../../components/recipeForm/newRecipe'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const CreateRecipe: NextPage = () => {
    const { status } = useSession()
    const router = useRouter()

    if (status === 'unauthenticated') router.push('/')

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <NewRecipe />
        </div>
    )
}

export default CreateRecipe