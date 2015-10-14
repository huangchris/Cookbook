$(function(root) {
  'use strict';
  root.App = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function(){
      return {user: UserStore.currentUser()}
    },

    componentDidMount: function() {
      UserStore.on(StoreConst.CURRENT_USER, function() {
        this.setState({user: UserStore.currentUser()})
      }.bind(this))
    },


    clickBack: function(e) {
      if (e.target === e.currentTarget) {
        this.history.pushState(null, "/")
      }
    },

    render: function ()  {
      return (
        <div onClick={this.clickBack} className="App">
          <div onClick={this.clickBack}>{this.state.user.name}</div>
          <Navbar/>
          {this.props.children}

        </div>
      )
    }
  })

  if(window.USER_ID !== undefined && window.location.pathname !== "/session/new") {
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
