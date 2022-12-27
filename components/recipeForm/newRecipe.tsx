import { useState } from "react"
import Ingredient from "../../interfaces/Ingredient"
import RecipeForm from "./recipeForm"
import { Category } from '@prisma/client'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function NewRecipe() {
    const router = useRouter()
    const { data: session } = useSession()

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

    const createRecipe = async () => {
        setIsSending(true)
        const postData = async () => {
            const data = {
                title,
                category,
                favorite: false,
                steps,
                description,
                images,
                ingredients,
                authorEmail: session!.user!.email,
            };

            const response = await fetch("/api/recipes", {
                method: "POST",
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
            saveRecipe={createRecipe}
            isSending={isSending}
        />

    )
}
