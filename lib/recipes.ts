import prisma from './prisma'

export async function getAllRecipeIds() {
    const recipeIds = await prisma.recipe.findMany({
        select: {
            id: true
        }
    })
    const recipeIdObjs = recipeIds.map((recipeId) => {
        return {
            params: {
                id: recipeId.id.toString()
            }
        }
    })
    return recipeIdObjs;
}

export async function getRecipeData(id: string) {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id
        },
        include: { ingredients: true, author: true }
    })
    return JSON.parse(JSON.stringify(recipe))
}