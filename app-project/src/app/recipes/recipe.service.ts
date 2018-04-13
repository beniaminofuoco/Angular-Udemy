import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
            'This is a simple Test',
            'http://finedininglovers-it.cdn.crosscast-system.com/BlogPost/l_4211_mini-tacos-ricetta-.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe('An another Recipe',
            'This is an another Test',
            'http://finedininglovers-it.cdn.crosscast-system.com/BlogPost/l_4211_mini-tacos-ricetta-.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Buns', 2)
            ])
    ];

    recipeSelected = new EventEmitter<Recipe>();

    constructor(private shoppingService: ShoppingListService){}

    getRecipe() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingService.addIngredients(ingredients);
    }
}