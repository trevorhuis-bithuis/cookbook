import os, json
import requests
import datetime
from typing import Any
import asyncio
from recipe import Recipe


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
            "createdAt": datetime.datetime.now().isoformat(),
            "updatedAt": datetime.datetime.now().isoformat(),
        }
        
        recipes_arr.append(recipe)
 
    json_object = json.dumps(recipes_arr, indent=4)
    
    with open(f"recipe_data/json/recipes.json", "w") as outfile:
        outfile.write(json_object)
        
    return recipes_arr
        
async def write_to_db( recipes) -> Any:
    print(recipes)
    url = "https://us-east-1.aws.data.mongodb-api.com/app/data-yhcha/endpoint/data/v1/action/insertMany"
    
    payload = json.dumps({
    "collection": "Recipe",
    "database": "cookbook",
    "dataSource": "cookbook",
    "documents": recipes,
    })
    headers = {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': 'cJjJAtHC79ZOPipGfiA8BfNMHovwz90FmUDEZ3WA2EPlQ1S3CSsl5yurKHiTLsOq',
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)

    return response.json()

async def main() -> None:
    
    filenames = get_recipe_filenames()
    
    recipes = create_recipes(filenames)
    
    recipes_objs = write_to_json(recipes)
    
    await write_to_db(recipes_objs)
    
    

if __name__ == '__main__':
    asyncio.run(main())