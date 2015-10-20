(function(root) {
  'use strict';
  var _tabTags = [];
  var _dispatcher = function (action) {
    switch (action.actionType) {
      case DispatcherConst.TAGS:
        _tabTags = action.data.tabs;
        TagStore.emit(StoreConst.TAB_TAGS)
        break;
      default:
    }
  }
  root.TagStore  = $.extend({},EventEmitter.prototype, {
    dispatcherId: AppDispatcher.register(_dispatcher),

    all: function () {
      return _tabTags;
    }
  })
}(this));
