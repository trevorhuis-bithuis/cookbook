import type { NextPage } from 'next'
import NewRecipe from '../../components/recipeForm/newRecipe'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

const CreateRecipe: NextPage = () => {
    const supabaseClient = useSupabaseClient()
    const user = useUser()

    if (!user)
        return (
            <Auth
                redirectTo="http://localhost:3000/"
                appearance={{ theme: ThemeSupa }}
                supabaseClient={supabaseClient}
                providers={['google']}
                socialLayout="horizontal"
            />
        )

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <NewRecipe />
        </div>
    )
}

export default CreateRecipe
