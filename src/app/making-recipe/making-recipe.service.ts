import {Ingredient} from "../shared/ingredient.model";
import {Subject} from 'rxjs';
import {Order} from "../shared/order.model";
import {Recipe} from "../recipes/recipe.model";

export class MakingRecipeService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  orderChanged = new Subject<Order[]>();

  private ingredients: Ingredient[] = [];
  private order: Order[] = [];
  private recipes: Recipe;

  getIngredients() {
    return this.ingredients.slice();
  }
  getOrder() {
    return this.order.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }


  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());

  }
  addOrder(order: Order[]){
    this.order.push(...order);
    this.orderChanged.next(this.order.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteOrder(index: number) {
    this.order.splice(index,1);
    this.orderChanged.next(this.order.slice());
  }

}
