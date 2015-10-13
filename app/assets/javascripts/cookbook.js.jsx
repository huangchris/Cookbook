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
