import { useState, useEffect } from 'react'
import RecipeForm from './recipeForm'
import { useRouter } from 'next/router'

export default function EditRecipe() {
    const router = useRouter()
    const { id } = router.query

    const [isLoading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [categories, setCategories] = useState<string[]>([''])
    const [description, setDescription] = useState('')
    const [images, setImages] = useState<string[]>([])
    const [ingredients, setIngredients] = useState<string[]>([''])
    const [steps, setSteps] = useState<string[]>([''])
    const [isSending, setIsSending] = useState(false)

    const editRecipe = async () => {
        setIsSending(true)
        const postData = async () => {
            const data = {
                title,
                categories,
                favorite: false,
                steps,
                description,
                images,
                ingredients,
            }

            const response = await fetch(`/api/recipes/${id}`, {
                method: 'PUT',
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

    useEffect(() => {
        setLoading(true)
        fetch(`/api/recipes/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.title)
                setCategories(data.categories)
                setDescription(data.description)
                setImages(data.images)
                setIngredients(data.ingredients)
                setSteps(data.steps)
                setLoading(false)
            })
    }, [id])

    if (isLoading) return <p>Loading...</p>

    return (
        <RecipeForm
            title={title}
            setTitle={setTitle}
            categories={categories}
            setCategories={setCategories}
            description={description}
            setDescription={setDescription}
            images={images}
            setImages={setImages}
            ingredients={ingredients}
            setIngredients={setIngredients}
            steps={steps}
            setSteps={setSteps}
            saveRecipe={editRecipe}
            isSending={isSending}
        />
    )
}
