import {Ingredient} from "../shared/ingredient.model";
import {Order} from "../shared/order.model"

export class Recipe {
  public name: string;
  public description: string;
  public order: Order[];
  public imagePath: string;
  public ingredients: Ingredient[];


  constructor(name: string, desc: string, imagePath: string, order: Order[], ingredients: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.order = order;
  }
}
