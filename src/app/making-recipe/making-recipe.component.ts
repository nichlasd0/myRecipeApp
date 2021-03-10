import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import {MakingRecipeService} from "./making-recipe.service";
import {Order} from "../shared/order.model";
import {Recipe} from "../recipes/recipe.model";


@Component({
  selector: 'app-shopping-list',
  templateUrl: './making-recipe.component.html',
  styleUrls: ['./making-recipe.component.css']
})
export class MakingRecipeComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  order: Order[];
  private igChangeSub: Subscription;

  constructor(private mrService: MakingRecipeService) {
  }

  ngOnInit() {
    this.ingredients = this.mrService.getIngredients();
    this.igChangeSub = this.mrService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
    this.order = this.mrService.getOrder();
    console.log('order', this.order);
    this.igChangeSub = this.mrService.orderChanged
      .subscribe((order: Order[]) => {
      this.order = order;
    });
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
