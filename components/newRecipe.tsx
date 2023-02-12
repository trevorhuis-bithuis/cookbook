import { useState } from 'react'
import RecipeForm from './recipeForm/recipeForm'
import { useRouter } from 'next/router'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function NewRecipe() {
    const router = useRouter()
    const session = useSession()
    const supabase = useSupabaseClient()

    if (!session) {
        router.push('/auth')
    }

    const [title, setTitle] = useState('')
    const [categories, setCategories] = useState<string[]>([])
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState<string>('')
    const [ingredients, setIngredients] = useState<string[]>([''])
    const [steps, setSteps] = useState<string[]>([''])
    const [isSending, setIsSending] = useState(false)

    const createRecipe = async () => {
        setIsSending(true)
        const postData = async () => {
            const data = {
                title,
                steps,
                description,
                categories,
                ingredients,
                imageUrl,
                author_id: session!.user.id,
            }

            const response = await fetch('/api/recipes', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return response.json()
        }

        try {
            const recipe = await postData()
        } catch (error) {
            console.log(error)
            // Delete the image from storage if failed
            if (imageUrl || imageUrl !== '') {
                await supabase.storage.from('recipe-photos').remove([imageUrl])
            }
        } finally {
            router.push('/search')
        }
    }

    return (
        <RecipeForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            categories={categories}
            setCategories={setCategories}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            ingredients={ingredients}
            setIngredients={setIngredients}
            steps={steps}
            setSteps={setSteps}
            saveRecipe={createRecipe}
            isSending={isSending}
        />
    )
}
