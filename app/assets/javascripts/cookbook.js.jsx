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
          <Navbar/>
          <div className="row">
            {this.props.children}
          </div>

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
        <Route path="/member/:id/recipes" components={{comp1: Family, comp2: Recipes}}/>
        <Route path="/recipes" component={Recipes}/>
        <Route path="/shared" components={{comp1: Family, comp2: Recipes}}/>
      </Route>
    </Router>,
    document.getElementById("content")
  )
}).bind(this);
