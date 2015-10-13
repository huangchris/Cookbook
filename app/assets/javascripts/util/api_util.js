(function(root) {
  'use strict';
  root.APIUtil = {
    updateProfilePic: function(urlstring) {
      $.ajax({
        url: "api/user" + current_user.id,
        type: "patch",
        data: {img: urlstring}
      })

    }
  }
}(this));
