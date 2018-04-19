import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs/Subject";

export class ShoppingListService {
    ingredientChange = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)
    ];

    getIngridients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChange.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // Questa soluzione commentata è comunque valida...ma quella usata è più pulita.
        //for(let ingr of ingredients){
        //    this.addIngredient(ingr);
        //}
        this.ingredients.push(...ingredients);
        this.ingredientChange.next(this.ingredients.slice());
    }
}