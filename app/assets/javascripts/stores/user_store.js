(function(root) {
  'use strict';
  var _currentUser = {};
  var _users = [];
  var _dispatches = function(action) {
    switch (action.actionType) {
      case DispatcherConst.CURRENT_USER:
        _currentUser = action.data;
        UserStore.emit(StoreConst.CURRENT_USER);
        break;
      default:

    }
  }
  root.UserStore = $.extend({}, EventEmitter.prototype, {
    DispatcherId: AppDispatcher.register(_dispatches),
    all: function () { return _users},
    currentUser: function () {return _currentUser},
    end: undefined
  });
}(this));
