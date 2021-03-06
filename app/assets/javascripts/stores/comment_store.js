(function(root) {
  'use strict';
  var _comments = [];

  var _dispatches = function(action) {
    if (action.actionType === DispatcherConst.COMMENTS) {
      _comments = action.data.comments;
      CommentStore.emit(StoreConst.COMMENTS);
    }
  }
  root.CommentStore = $.extend({},EventEmitter.prototype, {
    show: function(num) {
      if (num > _comments.length) {
        return _comments.slice()
      }
      return _comments.slice(_comments.length - num, _comments.length);
    },

    count: function() {
      return _comments.length
    },

    DispatcherId: AppDispatcher.register(_dispatches)
  })
}(this));
