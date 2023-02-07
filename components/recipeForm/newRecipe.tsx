import { useState } from 'react'
import Ingredient from '../../interfaces/Ingredient'
import RecipeForm from './recipeForm'
import { useRouter } from 'next/router'
import { useSession } from '@supabase/auth-helpers-react'

export default function NewRecipe() {
    const router = useRouter()
    const session = useSession()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState<string[]>([])
    const [ingredients, setIngredients] = useState<Ingredient[]>([
        {
            name: '',
            quantity: 0,
            unit: '',
            isValid: true,
        },
    ])
    const [steps, setSteps] = useState<string[]>([''])
    const [isSending, setIsSending] = useState(false)

    const createRecipe = async () => {
        setIsSending(true)
        const postData = async () => {
            const data = {
                title,
                favorite: false,
                steps,
                description,
                images,
                ingredients,
                authorEmail: session!.user!.email,
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
        postData().then((data) => {
            router.push(`/recipes/${data.recipe.id}`)
        })
    }

    return (
        <RecipeForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
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
