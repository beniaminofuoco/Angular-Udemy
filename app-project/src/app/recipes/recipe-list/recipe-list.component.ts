import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a simple Test', 'http://finedininglovers-it.cdn.crosscast-system.com/BlogPost/l_4211_mini-tacos-ricetta-.jpg'),
    new Recipe('An another Recipe', 'This is an another Test', 'http://finedininglovers-it.cdn.crosscast-system.com/BlogPost/l_4211_mini-tacos-ricetta-.jpg')
  ];

  ngOnInit() {
  }

  onRecipeSelected(itemSelected: Recipe){
    this.recipeWasSelected.emit(itemSelected);
  }
}
