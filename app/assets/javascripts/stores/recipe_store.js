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
        return { id: recipe.id, user_id: recipe.user_id, photo: recipe.photo,
           title: recipe.title, search_tags: recipe.search_tags
        };
      })
    },

    allFamily: function() {
      return _recipes.filter(function(recipe){
        return (!recipe.personal)
      })
    },

    allByUser: function(id) {
      return _recipes.filter(function(recipe){
        return (parseInt(recipe.user_id) === parseInt(id))
      })
    },

    filterByTag: function(tagID) {
      return _recipes.filter(function(recipe){
        return recipe.tab_tag_id === parseInt(tagID)
      })
    },

    find: function(id) {
      return _recipes.filter(function(recipe){
        return recipe.id === parseInt(id);
      })[0];
    }
  })
}(this));
