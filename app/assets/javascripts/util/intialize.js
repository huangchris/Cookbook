$(function(){
  //get current_user
  //success:  if(current_user & familygroup) {go to root}
  //  if no current_user go to login
  // if no familygroup go to #/family
  if(!window.CURRENT_USER) {
    window.location.replace("/session/new")
  }
  $.ajax({
    url: "api/users/" + window.CURRENT_USER
    type: "get"
    success: APIAction.setCurrentUser
  })
})
