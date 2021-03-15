import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Ingredient} from '../shared/ingredient.model';
import {MakingRecipeService} from "./making-recipe.service";
import {Order} from "../shared/order.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Recipe} from "../recipes/recipe.model";


@Component({
  selector: 'app-shopping-list',
  templateUrl: './making-recipe.component.html',
  styleUrls: ['./making-recipe.component.css']
})
export class MakingRecipeComponent implements OnInit {
  ingredients: Ingredient[];
  order: Order[];
  private igChangeSub: Subscription;
  editedItemIndex: number;
  id: number;
  recipe: Recipe;

  constructor(private mrService: MakingRecipeService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((
        params: Params) => {
          this.id = +params['id'];
          this.recipe = this.mrService.getRecipe(this.id);
          console.log('id', this.id);
          console.log('recipe', this.recipe.name);
        }
      );
    this.ingredients = this.mrService.getIngredients();
    this.igChangeSub = this.mrService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
    this.order = this.mrService.getOrder();
    this.igChangeSub = this.mrService.orderChanged
      .subscribe((order: Order[]) => {
        this.order = order;
      });

  }

  onDeleteIngredient() {
    this.mrService.deleteIngredient(this.editedItemIndex);
  }

  onDeleteOrder() {
    this.mrService.deleteOrder(this.editedItemIndex);
  }

  // ngOnDestroy(): void {
  //   this.igChangeSub.unsubscribe();
  // }
}
