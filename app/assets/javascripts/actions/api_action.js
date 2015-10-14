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
    }
  }
}(this));
