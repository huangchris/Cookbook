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

    kickMember: function(id) {
      $.ajax({
        url: "api/user_groups/" + id,
        type: "delete",
        success: APIUtil.fetchFamily
      })
    },

    promoteMember: function(id) {
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

    getFamilies: function() {
      // grab a list of families
      $.ajax({
        url: "api/groups",
        success: APIAction.updateFamilies,
        error: function(response){
          if(response.status === 500){
            console.log("This error is probably because an unnecessary" +
              " request was canceled by the server")
          } else { console.log(response)}
        }
      })
    },

    fetchFamily: function(successCallback, failCallback) {
      if(typeof successCallback !== "function") {
        successCallback = APIAction.setFamily;
      }
      if(typeof failCallback !== "function") {
        failCallback = function (response) {
          console.log(response);
          APIUtil.getFamilies();
        }
      }
      $.ajax({
        url: "api/group",
        type: "get",
        success: successCallback,
        error: failCallback
        // could also grab all user_recipes on success (and all fam recipes?)
      })
    },

    makeFamily: function(data) {
      $.ajax({
        url: "api/group",
        type: "post",
        data: data,
        success: APIAction.setFamily

      })
    },

    joinFamily: function(id) {
      if(id === null) {return;}
      var data = {
        group_id: id
      };

      $.ajax({
        url: "api/user_groups",
        type: "post",
        data: data,
        success: APIAction.setFamily
      })
    },

    getRecipeIndex: function() {
      $.ajax({
        url: "api/recipes",
        type: "get",
        success: APIAction.updateRecipes
      })
    },

    newRecipe: function(data, id) {
      $.ajax({
        url:"/api/recipes",
        type: "post",
        data: {recipe: data, request_id: id},
        success: APIAction.updateRecipes
      })
    },

    editRecipe: function(data) {
      $.ajax({
        url:"/api/recipes/" + data.id,
        type: "patch",
        data: {recipe: data},
        success: APIAction.updateRecipes
      })
    },

    deleteRecipe: function(id) {
      $.ajax({
        url:"/api/recipes/" + id,
        type: "delete",
        success: APIUtil.getRecipeIndex
      })
    },

    getTabTags: function(stuff) {
      $.ajax({
        url:"/api/tab_tags",
        type: "get",
        success: APIAction.updateTags
      })
    },

    getComments: function(id, parent) {
      $.ajax({
        url:"/api/comments",
        type:"get",
        data:{id: id, parent: parent},
        success: APIAction.updateComments,
        error: this.logError
      })
    },
    createComment: function(body, id, parent) {
      $.ajax({
        url: "/api/comments",
        type: "post",
        data: {comment:{body: body, commentable_id: id,
          commentable_type: parent}},
        success:APIAction.updateComments
      })
    },

    createRequest: function(data) {
      var request = {request: {title: data.title, description: data.description}}
      $.ajax({
        url:"/api/requests",
        type: "post",
        data: request,
        success: APIAction.updateRequests
      })
    },

    getRequests: function () {
      $.ajax({
        url:"/api/requests",
        type:"get",
        success:APIAction.updateRequests
      })
    },

    samplePictures: function () {
      $.ajax({
        url: "/pictures",
        type: "get",
        success: APIAction.updatePictures
      })
    }
  }
}(this));
