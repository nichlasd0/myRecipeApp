import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import {HeaderComponent} from "./header/header.component";
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import {DropdownDirective} from "./shared/dropdown.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MakingRecipeComponent } from './making-recipe/making-recipe.component';
import {HttpClientModule} from "@angular/common/http";
import {MakingRecipeService} from "./making-recipe/making-recipe.service";
import {RecipeService} from "./recipes/recipe.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeStartComponent,
    RecipesComponent,
    DropdownDirective,
    RecipeItemComponent,
    MakingRecipeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MakingRecipeService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
