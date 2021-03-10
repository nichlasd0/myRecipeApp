import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import {MakingRecipeService} from "./making-recipe.service";


@Component({
  selector: 'app-shopping-list',
  templateUrl: './making-recipe.component.html',
  styleUrls: ['./making-recipe.component.css']
})
export class MakingRecipeComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
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
  }
  onEditItem(index: number) {
    this.mrService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
