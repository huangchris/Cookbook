this.demoLogin = function(e) {
  e.preventDefault();
  $.ajax({
    url: "/session",
    type: "post",
    data: {user: {email: "example@cookbook.com", password: "password"}},
    success: function() {
      window.location.replace("/")
    }
  });
}
