import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";
import {MakingRecipeService} from "../making-recipe/making-recipe.service";
import {Order} from "../shared/order.model";

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe('A test recipe', 'this is a test',
  //     'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg', [new Order ('make dough')],[new Ingredient('Meat', 1, 'kg'),
  //     new Ingredient('French Fries', 20, 'g')]),
  //   new Recipe('Another test recipe', 'this is a test', 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',
  //     [new Order ('make dough')], [new Ingredient('Cheese', 2, 'slice'),
  //     new Ingredient('Water', 5, 'g')])
  // ];

  private recipes: Recipe[] = [];

  constructor(private MRService: MakingRecipeService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToMR(ingredient: Ingredient[]) {
    this.MRService.addIngredients(ingredient);
  }
  addOrderToMr(order: Order[]) {
    this.MRService.addOrder(order);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
