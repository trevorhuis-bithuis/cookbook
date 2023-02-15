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

async function getPublicUrl(path: string) {
    try {
        const { data } = await supabase.storage
            .from('recipe-photos')
            .getPublicUrl(`public/${path}`)
        return data.publicUrl
    } catch (error) {
        console.error('Error downloading image: ', error)
    }
}

export async function getRecipeData(id: string) {
    const { data: recipe, error } = await supabase
        .from('recipes')
        .select(
            'id, description, title, steps, ingredients, author_id, updated_at, image_url, profiles(full_name), categories:recipe_categories(name)'
        )
        .eq('id', id)
        .single()

    let imageUrl: string | undefined = ''
    if (recipe!.image_url && recipe!.image_url === '') {
        imageUrl = await getPublicUrl(recipe!.image_url)
    }
    if (error) {
        console.error(error)
        return null
    }
    return JSON.parse(JSON.stringify({ ...recipe, imageUrl }))
}
