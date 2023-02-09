import supabase from './supabase-server'

export async function getAllRecipeIds() {
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
    const { data: recipe, error } = await supabase
        .from('recipes')
        .select('id, description, title, category, steps, ingredients, author_id, updated_at, profiles (full_name)')
        .eq('id', id)
        .single()
    console.log(recipe);
    if (error) {
        console.error(error)
        return null
    }
    return JSON.parse(JSON.stringify(recipe))
}
