(function(root) {
  'use strict';
  var _recipes = [];
  var _dispatcher = function(action) {
    switch (action.actionType) {
      case DispatcherConst.RECIPE_INDEX:
        _recipes = action.data.recipes;
        break;
      default:
    }
  }
  root.RecipeStore = $.extend({},EventEmitter.prototype, {
    dispatcherId: AppDispatcher.register(_dispatcher)
  })
}(this));
