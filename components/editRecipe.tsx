import { useState, useEffect } from 'react'
import RecipeForm from './recipeForm/recipeForm'
import { useRouter } from 'next/router'

export default function EditRecipe() {
    const router = useRouter()
    const { id } = router.query

    const [isLoading, setLoading] = useState(true)
    const [title, setTitle] = useState('')
    const [categories, setCategories] = useState<string[]>([''])
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState<string>('')
    const [ingredients, setIngredients] = useState<string[]>([''])
    const [steps, setSteps] = useState<string[]>([''])
    const [isSending, setIsSending] = useState(false)

    const editRecipe = async () => {
        setIsSending(true)
        const postData = async () => {
            const data = {
                title,
                categories,
                steps,
                description,
                ingredients,
                imageUrl,
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

        try {
            await postData()
        } catch (error) {
            console.log(error)
        } finally {
            router.push(`/recipes/${id}`)
        }
    }

    useEffect(() => {
        if (!id) return
        setLoading(true)
        fetch(`/api/recipes/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.title)
                setCategories(data.categories)
                setDescription(data.description)
                setIngredients(data.ingredients)
                setSteps(data.steps)
                setImageUrl(data.imageUrl)
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
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            ingredients={ingredients}
            setIngredients={setIngredients}
            steps={steps}
            setSteps={setSteps}
            saveRecipe={editRecipe}
            isSending={isSending}
            isEdit={true}
        />
    )
}
