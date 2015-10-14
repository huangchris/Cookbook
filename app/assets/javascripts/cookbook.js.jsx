$(function(root) {
  'use strict';
  root.App = React.createClass({
    render: function ()  {
      return (
        <div className="App">
          <Navbar/>
          {this.props.children}

        </div>
      )
    }
  })
  
  if(!window.USER_ID) {
    window.location.replace("/session/new")
  }else{
    $.ajax({
      url: "api/users/" + window.USER_ID,
      type: "get",
      success: APIAction.setCurrentUser
    })
  }


  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  React.render(
    <Router>
      <Route path="/" component={root.App}>
      </Route>
    </Router>,
    document.getElementById("content")
  )
}).bind(this);
