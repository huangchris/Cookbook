(function(root) {
  'use strict';
  var _recipes = [];
  var _dispatcher = function(action) {
    switch (action.actionType) {
      case DispatcherConst.RECIPES:
        _recipes = action.data.recipes;
        RecipeStore.emit(StoreConst.RECIPE_INDEX)
        break;
      default:
    }
  }
  root.RecipeStore = $.extend({},EventEmitter.prototype, {
    dispatcherId: AppDispatcher.register(_dispatcher),
    all: function() {
      return _recipes.map(function(recipe){
        return { id: recipe.id, user_id: recipe.user_id, title: recipe.title};
      })
    },
    
    find: function(id) {
      return _recipes.filter(function(recipe){
        return recipe.id === id;
      })[0];
    }
  })
}(this));
