// EUTM
// The problem with <a> links is I want to run APIUtil calls on click to refresh data
// At which point I might as well not use links

(function(root) {
  'use strict';
  root.Navbar = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {user: UserStore.currentUser()}
    },

    clickBack: function(e) {
      if (e.target === e.currentTarget) {
        this.history.pushState(null, "/")
      }
    },
    storeListener: function () {
      this.setState({user: UserStore.currentUser()})
    },

    componentDidMount: function () {
      UserStore.on(StoreConst.CURRENT_USER, this.storeListener)
    },

    componentWillUnmount: function () {
      FamilyStore.removeListener(StoreConst.CURRENT_USER, this.storeListener)
    },

    render: function () {
      return (
        <nav className="navbar-default">
          <div className="container-fluid" onClick={this.clickBack}>
            <ul className="nav navbar-nav navbar-left">
              <li><a className="" href="#">{this.state.user.name}</a></li>
              <li className=""><a href="#/recipes">My Book</a></li>

              <li className=""><a href="#/family/recipes">Family Book</a></li>

              <li className=""><a href="#/family">My Family</a></li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li className=""><Pic user={this.state.user}/></li>
              <li className=""><a href="/session/new">Logout</a></li>
            </ul>
          </div>
            {this.props.children}
        </nav>
      )
    }

  })
}(this));
