import { useState, useEffect } from "react"
import Ingredient from "../../interfaces/Ingredient"
import RecipeForm from "./recipeForm"
import { Category } from '@prisma/client'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function EditRecipe() {
    const router = useRouter()
    const { data: session } = useSession()
    const { id } = router.query

    const [isLoading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState<Category>(Category.Dinner)
    const [description, setDescription] = useState('')
    const [images, setImages] = useState<string[]>([])
    const [ingredients, setIngredients] = useState<Ingredient[]>([{
        name: '',
        quantity: 0,
        unit: '',
    }])
    const [steps, setSteps] = useState<string[]>(['',])
    const [isSending, setIsSending] = useState(false)

    const editRecipe = async () => {
        setIsSending(true)
        const postData = async () => {
            const data = {
                title,
                category,
                favorite: false,
                steps,
                description,
                images,
                ingredients
            };

            const response = await fetch(`/api/recipes/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.json();
        };

        postData().then((data) => {
            router.push(`/recipes/${data.recipe.id}`);
        });
    }

    useEffect(() => {
        setLoading(true)
        fetch(`/api/recipes/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.title)
                setCategory(data.category)
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
            category={category}
            setCategory={setCategory}
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
