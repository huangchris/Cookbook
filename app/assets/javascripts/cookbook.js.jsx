$(function(root) {
  'use strict';
  root.App = React.createClass({
    mixins: [ReactRouter.History],



    clickBack: function(e) {
      if (e.target === e.currentTarget) {
        this.history.pushState(null, "/")
      }
    },

    render: function ()  {
      return (
        <div onClick={this.clickBack} className="App">
          <Navbar/>
          {this.props.children}

        </div>
      )
    }
  })

  if(!window.USER_ID && window.location.pathname !== "/session/new") {
    window.location.replace("/session/new")
  }else if(window.location.pathname !== "/session/new"){
    debugger;
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
        <Route path="/family" component={Family}/>
      </Route>
    </Router>,
    document.getElementById("content")
  )
}).bind(this);
