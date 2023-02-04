interface CreateRecipe {
    title: string;
    category: string;
    steps: string[];
    authorId: number;
    description: string;
    ingredients: string[];
}

interface UpdateRecipe {
    id: number;
    title: string;
    category: string;
    steps: string[];
    authorId: number;
    description: string;
    ingredients: string[];
}

interface Recipe {
    id: number;
    title: string;
    category: string;
    steps: string[];
    authorId: number;
    description: string;
    ingredients: string[];
}