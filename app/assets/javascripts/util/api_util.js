(function(root) {
  'use strict';
  root.APIUtil = {
    updateProfilePic: function(urlstring) {
      //I could check it's a valid URL by $.ajax it first, and do the rest on
      // success.  Could read the API to check that it returns an img, too
      $.ajax({
        url: "api/users/" + UserStore.currentUser().id,
        type: "patch",
        data: {user: {image: urlstring} },
        success: APIAction.setCurrentUser
      })

    },

    fetchFamily: function() {
      $.ajax({
        url: "api/group",
        type: "get",
        success: APIAction.setFamily
        // could also grab all user_recipes here (and all fam recipes?)
      })
    }
  }
}(this));
