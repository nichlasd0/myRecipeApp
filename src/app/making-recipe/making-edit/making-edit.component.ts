import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {MakingRecipeService} from "../making-recipe.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './making-edit.component.html',
  styleUrls: ['./making-edit.component.css']
})
export class MakingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) mrForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private mrService: MakingRecipeService) {
  }

  ngOnInit() {
    this.subscription = this.mrService.startedEditing
      .subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.mrService.getIngredient(index);
        this.mrForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
          unit: this.editedItem.unit
        })
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount, value.unit);
    if (this.editMode) {
      this.mrService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {

      this.mrService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.mrForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.onClear();
    this.mrService.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
