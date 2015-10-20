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
        success: APIAction.setCurrentUser,
        error: APIUtil.logError
      })
    },

    kickMember: function(id) {
      $.ajax({
        url: "api/user_groups/" + id,
        type: "delete",
        success: APIAction.setFamily,
        error: APIUtil.logError
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
        success: APIAction.setFamily,
        error: APIUtil.logError
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
        success: APIAction.setFamily,
        error: APIUtil.logError

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
        success: APIAction.setFamily,
        error: APIUtil.logError
      })
    },

    getRecipeIndex: function(route, id) {
      var data;
      if(route.path === "family") {
          data = {indexType:"family"};
      } else if ( route.path === "recipes") {
          data = {};
      } else {
          data = {indexType: "user", id: id};
      }

      $.ajax({
        url: "api/recipes",
        type: "get",
        data: data,
        success: APIAction.updateRecipes,
        error: this.logError
      })

    },

    newRecipe: function(data) {
      debugger;
      $.ajax({
        url:"/api/recipes",
        type: "post",
        data: {recipe: data},
        success: APIAction.updateRecipes,
        error:this.logError
      })
    },

    editRecipe: function(data) {
      debugger;
      $.ajax({
        url:"/api/recipes/" + data.id,
        type: "patch",
        data: {recipe: data},
        success: APIAction.updateRecipes,
        error:this.logError
      })
    },

    getTabTags: function(stuff) {
      $.ajax({
        url:"/api/tab_tags",
        type: "get",
        success: APIAction.updateTags,
        error: this.logError
      })
    },

    logError: function(response) {
      console.log(response)
    }
  }
}(this));
