$(function(){
  //get current_user
  //success:  if(current_user & familygroup) {go to root}
  //  if no current_user go to login
  // if no familygroup go to #/family
  if(!window.USER_ID) {
    window.location.replace("/session/new")
  }else{
    $.ajax({
      url: "api/users/" + window.USER_ID,
      type: "get",
      success: APIAction.setCurrentUser
    })
  }
})
