(function(root) {
  'use strict';
  var _requests = [];
  var _dispatches = function (action) {
    if (action.actionType === DispatcherConst.REQUESTS) {
      _requests = action.data.requests;
      RequestStore.emit(StoreConst.REQUESTS)
    }
  }

  root.RequestStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _requests.slice();
    },
    dispatcherId: AppDispatcher.register(_dispatches)
  })
}(this));
