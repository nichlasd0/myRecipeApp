import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";

@Injectable({providedIn: 'root'})

export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://my-recipe-app-b5166-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://my-recipe-app-b5166-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredient: recipe.ingredients ? recipe.ingredients : [],
              order: recipe.order ? recipe.order : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
}
