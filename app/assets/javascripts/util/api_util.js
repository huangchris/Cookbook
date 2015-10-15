(function(root) {
  'use strict';
  root.APIUtil = {
    getFamilies: function() {
      // grab a list of families
      $.ajax({
        url: "api/groups",
        success: APIAction.updateFamilies,
        error: function () {
          console.log("tried to grab families when not needed")
        }
      })
    },

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
        // could also grab all user_recipes on success (and all fam recipes?)
      })
    },

    makeFamily: function(data) {
      $.ajax({
        url: "api/group",
        type: "post",
        data: data,
        // success: APIUtil.joinFamily.bind(null,"admin",id)
        success: APIAction.setFamily
      })
    }
  }

// probably can (and should) do this on the backend
  //   joinFamily: function(status, id, response) {
  //     var data = {
  //       user_id: id,
  //       group_id: response.group.id,
  //       status: status
  //     };
  //
  //     $.ajax({
  //       url: "api/user_groups",
  //       type: "post",
  //       data: data,
  //       success: APIAction.setFamily
  //     })
  //   }
  // }
}(this));
