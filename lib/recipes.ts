import { createClient } from './supabase-server'

export async function getAllRecipeIds() {
    const supabase = createClient()
    const { data: recipeIds, error } = await supabase
        .from('recipes')
        .select('id')
    if (error) {
        console.error(error)
        return []
    }
    const recipeIdObjs = recipeIds.map((recipeId) => {
        return {
            params: {
                id: recipeId.id.toString(),
            },
        }
    })
    return recipeIdObjs
}

export async function getRecipeData(id: string) {
    const supabase = createClient()
    const { data: recipe, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
    if (error) {
        console.error(error)
        return null
    }
    return JSON.parse(JSON.stringify(recipe))
}
