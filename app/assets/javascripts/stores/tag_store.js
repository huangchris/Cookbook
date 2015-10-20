(function(root) {
  'use strict';
  var _tabTags = [];

  root.TagStore  = $.extend({},EventEmitter.prototype, {
    all: function () {
      return _tabTags;
    }
  })
}(this));
