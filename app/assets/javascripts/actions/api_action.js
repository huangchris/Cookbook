(function(root) {
  'use strict';
  root.APIAction = {
    setCurrentUser: function (user) {
      AppDispatcher.dispatch({
        actionType: DispatcherConst.CURRENT_USER,
        data: user
      })
    }
  }
}(this));
