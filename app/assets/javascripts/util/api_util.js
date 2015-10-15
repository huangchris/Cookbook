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

    // APIUtil.kickMember(e.target.dataset.id)
    // APIUtil.promoteMember(e.target.dataset.id)
    kickMember: function(id) {
      $.ajax({
        url: "api/user_groups/" + id,
        type: "delete",
        success: APIAction.setFamily
      })
    },

    promoteMember: function(id) {
      debugger;
      var data = {user_group: {status: "admin"}}
      this.updateUser(id, data)
    },

    approveUser: function(id) {
      var data = {user_group: {status: "member"}}
      this.updateUser(id, data)
    },

    updateUser: function(id, data) {
      $.ajax({
        url: "api/user_groups/" + id,
        type: "patch",
        data: data,
        success: APIAction.setFamily
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
