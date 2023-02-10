import { useState } from 'react'
import RecipeForm from './recipeForm'
import { useRouter } from 'next/router'
import { useSession } from '@supabase/auth-helpers-react'

export default function NewRecipe() {
    const router = useRouter()
    const session = useSession()

    if (!session) {
        router.push('/auth')
    }

    const [title, setTitle] = useState('')
    const [categories, setCategories] = useState<string[]>([])
    const [description, setDescription] = useState('')
    const [images, setImages] = useState<string[]>([])
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
        postData()
            .then((data) => {
                console.log(data)
                router.push(`/recipes/${data.recipe.id}`)
            })
            .catch((error) => {
                console.log(error)
                router.push('/recipes/create')
            })
    }

    return (
        <RecipeForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            categories={categories}
            setCategories={setCategories}
            images={images}
            setImages={setImages}
            ingredients={ingredients}
            setIngredients={setIngredients}
            steps={steps}
            setSteps={setSteps}
            saveRecipe={createRecipe}
            isSending={isSending}
        />
    )
}
