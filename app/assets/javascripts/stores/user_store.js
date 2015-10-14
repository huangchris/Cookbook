(function(root) {
  'use strict';
  var _currentUser = {};
  var _users = [];
  var _family = {};

  var _dispatches = function(action) {
    switch (action.actionType) {
      case DispatcherConst.CURRENT_USER:
        _currentUser = action.data;
        UserStore.emit(StoreConst.CURRENT_USER);
        break;
      case DispatcherConst.CURRENT_FAMILY:
        _users = action.data.users
        _family = action.data.family
        UserStore.emit(StoreConst.CURRENT_FAMILY);
      default:

    }
  }

  root.UserStore = $.extend({}, EventEmitter.prototype, {
    DispatcherId: AppDispatcher.register(_dispatches),
    all: function () { return _users.slice() },
    currentUser: function () {return _currentUser },
    family: function() {return $.extend({},_family) }
  });
}(this));
