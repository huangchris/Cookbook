(function(root) {
  'use strict';
  var _currentUser = {};
  var _users = [];
  var _family = {};
  var _admin = false;
  var _adminsList = [];
  var _pendingUsers = [];

//I should move current family to the new FamilyStore

  var _dispatches = function(action) {
    switch (action.actionType) {
      case DispatcherConst.CURRENT_USER:
        _currentUser = action.data;
        UserStore.emit(StoreConst.CURRENT_USER);
        break;
      case DispatcherConst.CURRENT_FAMILY:
        if (action.data !== null) {
          _users = action.data.users
          _family = action.data.family
          _admin = action.data.admin
          _adminsList = action.data.admin_ids
          _pendingUsers = action.data.new_users
          UserStore.emit(StoreConst.CURRENT_FAMILY);
        }
      default:

    }
  }

  root.UserStore = $.extend({}, EventEmitter.prototype, {
    DispatcherId: AppDispatcher.register(_dispatches),
    all: function () { return _users.slice() },
    currentUser: function () {return _currentUser },
    family: function() {return $.extend({},_family) },
    admin: function() {return _admin},
    isAdmin: function (id) { return (_adminsList.indexOf(id) !== -1) },
    isPending: function () {
      return _pendingUsers.some(function(user){
        return user.id === _currentUser.id
      })
    },
    find: function(id) {
      if (id === window.USER_ID) {return _currentUser.name}
      return _users.filter(function(user){
        return user.id === id;
      })[0].name;
    },
    pendingUsers: function () {return _pendingUsers.slice()}
  });
}(this));
