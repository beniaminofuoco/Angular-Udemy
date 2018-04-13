import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService {
    ingredientChange = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)
    ];

    getIngridients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChange.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // Questa soluzione commentata è comunque valida...ma quella usata è più pulita.
        //for(let ingr of ingredients){
        //    this.addIngredient(ingr);
        //}
        this.ingredients.push(...ingredients);
    }
}