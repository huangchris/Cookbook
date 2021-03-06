//Oh I can DRY this, can't I, have all of them call a method with diff. args

(function(root) {
  'use strict';
  root.APIAction = {
    setCurrentUser: function (user) {
      AppDispatcher.dispatch({
        actionType: DispatcherConst.CURRENT_USER,
        data: user
      })
    },

    setFamily: function(family) {
      AppDispatcher.dispatch({
        actionType: DispatcherConst.CURRENT_FAMILY,
        data: family
      })
    },

    updateFamilies: function(response) {
      AppDispatcher.dispatch({
        actionType: DispatcherConst.FAMILIES,
        data: response
      })
    },

    updateRecipes: function(response) {
      AppDispatcher.dispatch({
        actionType: DispatcherConst.RECIPES,
        data: response
      })
    },

    updateTags: function(response) {
      AppDispatcher.dispatch({
        actionType: DispatcherConst.TAGS,
        data:response
      })
    },
    updateComments: function(response) {
      AppDispatcher.dispatch({
        actionType: DispatcherConst.COMMENTS,
        data: response
      })
    },
    updateRequests: function(response) {
      AppDispatcher.dispatch({
        actionType: DispatcherConst.REQUESTS,
        data:response
      })
    },
    updatePictures: function(response) {
      AppDispatcher.dispatch({
        actionType: DispatcherConst.PICTURES,
        data: response
      })
    }
  }
}(this));
