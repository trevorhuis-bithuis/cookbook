import os, json
from typing import Any
from dotenv import load_dotenv
import asyncio
from prisma import Prisma
from recipe import Recipe

load_dotenv('../.env')

def get_recipe_filenames() -> list:
    files = []
    for filename in os.listdir('recipe_data/text'):
        f = os.path.join('recipe_data/text', filename)
        if os.path.isfile(f):
            files.append(f)
    return files

def create_recipes(filenames) -> list:
    recipes = []
    for file in filenames:
        f = open(file, "r")
        print(f"Processing {file}")
        recipes.append(file_to_recipe_helper(f))
        
    return recipes

def file_to_recipe_helper(file) -> Recipe:
    file_arr = file.readlines()
    title = ''
    description = ''
    ingredients = []
    steps = []
    
    file_arr.pop(0) # Pop title header
    file_arr.pop(0) # Pop blank line
    title = file_arr[0]
    file_arr.pop(0) # Pop Title
    file_arr.pop(0) # Pop blank line
    
    file_arr.pop(0) # Pop description header
    file_arr.pop(0) # Pop blank line
    if 'Ingredients:' not in file_arr[0]:
        description = file_arr[0]
        file_arr.pop(0) # Pop Description
        file_arr.pop(0) # Pop blank line
        
        
    file_arr.pop(0) # Pop ingredients header
    file_arr.pop(0) # Pop blank line
    
    for idx in range(len(file_arr)):
        if 'Directions:' in file_arr[idx]:
            ingredients = file_arr[:idx - 1]
            del file_arr[:idx]
            break

    file_arr.pop(0) # Pop directions header
    file_arr.pop(0) # Pop blank line
    
    steps = file_arr
    
    title = title.strip()
    description = description.strip()
    ingredients = [ingredient.strip() for ingredient in ingredients]
    steps = [step.strip() for step in steps]
        
    return Recipe(description=description, title=title, ingredients=ingredients, steps=steps)
    

def write_to_json(recipes) -> None:
    recipes_arr = []
    
    for recipe in recipes:
        recipe = {
            "title": recipe.title,
            "description": recipe.description,
            "ingredients": recipe.ingredients,
            "steps": recipe.steps,
        }
        
        recipes_arr.append(recipe)
 
    json_object = json.dumps(recipes_arr, indent=4)
    
    with open(f"recipe_data/json/recipes.json", "w") as outfile:
        outfile.write(json_object)
        
async def write_to_db(db, recipes) -> Any:
    batcher = db.batch_()
    for recipe in recipes:
        batcher.recipe.create({
            "title": recipe.title,
            "description": recipe.description,
            "ingredients": recipe.ingredients,
            "steps": recipe.steps,
            "authorId": "clk6269s600007h3g5h830k9z"
        })
    commit = await batcher.commit()
    return commit

async def main() -> None:
    db = Prisma(auto_register=True)
    await db.connect()
    
    filenames = get_recipe_filenames()
    
    recipes = create_recipes(filenames)
    
    write_to_json(recipes)
    
    await write_to_db(db, recipes)
    
    

if __name__ == '__main__':
    asyncio.run(main())