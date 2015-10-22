(function(root) {
  'use strict';
  var _comments = [];

  var _dispatches = function(action) {
    if (action.actionType === DispatcherConst.COMMENTS) {
      _comments = action.data.comments;
      CommentStore.emit(StoreConst.COMMENTS)
    }
  }
  root.CommentStore = $.extend({},EventEmitter.prototype, {
    show: function(num) {
      return _comments.slice(0, num);
    },

    DispatcherId: AppDispatcher.register(_dispatches)
  })
}(this));
