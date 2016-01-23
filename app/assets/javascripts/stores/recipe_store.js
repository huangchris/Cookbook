(function(root) {
  'use strict';
  var _recipes = [];
  var _bookCache= [];
  var _tabCache= [];
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
      _bookCache = _recipes.filter(function(recipe){
        return (!recipe.personal)
      })
      _tabCache = _bookCache
      return _bookCache;
    },

    allByUser: function(id) {
      _bookCache = _recipes.filter(function(recipe){
        return (parseInt(recipe.user_id) === parseInt(id))
      });
      _tabCache = _bookCache
      return _bookCache;
    },

    filterByTag: function(tagID) {
      if (tagID === "All" ){
        _tabCache = _bookCache;
      } else {
        _tabCache = _bookCache.filter(function(recipe){
          return recipe.tab_tag_id === parseInt(tagID)
        })
      }
      return _tabCache;
    },

    search: function(string) {
      return _tabCache.filter(function(recipe) {
        return (recipe.title.toLowerCase().match(string.toLowerCase()) ||
                recipe.search_tags.some(function(tag){
                  return tag.data.toLowerCase().match(string.toLowerCase())
                }))
      })
    },

    find: function(id) {
      return _recipes.filter(function(recipe){
        return recipe.id === parseInt(id);
      })[0];
    }
  })
}(this));
