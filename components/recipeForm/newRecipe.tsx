import { useState } from 'react'
import RecipeForm from './recipeForm'
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
    const [image, setImage] = useState<any[]>([])
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

        const uploadImages = async () => {
            const imageUrls = [];
            for (const file of image) {
                // let fileName = `${uuidv4()}.${file.type.split('/')[1]}`
                // const { data, error } = await supabase.storage
                //     .from('recipe-photos')
                //     .upload(`public/${fileName}`, file);
                // if (error) {
                //     console.log(error)
                // }
                // imageUrls.push(fileName)
                console.log(file);
            }
            return imageUrls
        }

        const addImagesToRecipe = async (recipeId: string, imageUrls: string[]) => {
            const { data, error } = await supabase
                .from('recipes')
                .update({ images: imageUrls })
                .eq('id', recipeId)
            if (error) {
                console.log(error)
            }
        }


        try {
            const recipe = await postData();
            console.log(recipe);
            const recipeUrls = await uploadImages();
            console.log(recipeUrls);
            await addImagesToRecipe(recipe.id, recipeUrls);
        } catch (error) {
            console.log(error)
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
            image={image}
            setImage={setImage}
            ingredients={ingredients}
            setIngredients={setIngredients}
            steps={steps}
            setSteps={setSteps}
            saveRecipe={createRecipe}
            isSending={isSending}
        />
    )
}
