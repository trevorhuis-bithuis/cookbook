class Recipe:
    
    def __init__(self, title, description, ingredients, steps) -> None:
        self.title = title
        self.description = description
        self.ingredients = ingredients
        self.steps = steps
        
    def __str__(self) -> str:
        return f"Title: {self.title}, Description: {self.description}, Ingredients: {self.ingredients}, Steps: {self.steps}"
        