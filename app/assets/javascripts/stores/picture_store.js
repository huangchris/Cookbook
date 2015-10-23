(function(root) {
  'use strict';
  var _pictures = [];
  var _dispatches = function(action) {
    if (action.actionType === DispatcherConst.PICTURES) {
      _pictures = action.data;
      PictureStore.emit(StoreConst.PICTURES)
    }
  }
  
  root.PictureStore = $.extend({}, EventEmitter.prototype, {
    DispatcherId: AppDispatcher.register(_dispatches),
    all: function () {
      return _pictures.slice();
    }

  })

}(this));
