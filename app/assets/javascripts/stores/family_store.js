(function(root) {
  'use strict';
  var _family = {};
  var _families = [];

//I should move current family to the new FamilyStore

  var _dispatches = function(action) {
    switch (action.actionType) {
      case DispatcherConst.CURRENT_FAMILY:
        if (action.data !== null) {
          _family = action.data.family;
          FamilyStore.emit(StoreConst.CURRENT_FAMILY);
        }
      break;
      case DispatcherConst.FAMILIES:
        _families = action.data.families;
        FamilyStore.emit(StoreConst.FAMILIES);
      break;
      default:

    }
  }

  root.FamilyStore = $.extend({}, EventEmitter.prototype, {
    DispatcherId: AppDispatcher.register(_dispatches),
    families: function () {
      return _families.slice() },
    family: function() {return $.extend({},_family) }
  });
}(this));
