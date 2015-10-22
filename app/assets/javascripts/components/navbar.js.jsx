// EUTM

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

    logout: function(e) {
      e.preventDefault();
      $.ajax({
        url: "/session",
        type: "delete",
        success: function() {
          window.location = "/session/new"
        }
      })
    },

    unGroup: function(e) {
      if(confirm("Are you sure you want to leave? All of your data will be lost.")) {
        APIUtil.kickMember(this.state.user.id)
      }
      // this.history.pushState(null, "/")
      // don't need that because that's the default behaviour.
    },

    passwordChange: function(e) {
      e.preventDefault();
      alert("This should open a modal to let you change your password")
      // it might just fake it and tell you to expect an email with
      // instructions to reset your password.
    },

    myBook: function(e) {
      e.preventDefault();
      this.history.pushState({id: UserStore.currentUser().id}, "/recipes")
    },

    render: function () {
                  //  <li><a href="#" onClick={this.passwordChange}>Change Password</a></li>
      return (
        <nav className="navbar-default">
          <div className="container-fluid" onClick={this.clickBack}>
            <img className="navbar-brand"
                  onClick={this.clickBack}
                  src="/assets/CookBooks-logo.png">
            </img>
            <ul className="nav navbar-nav navbar-left">
              <li><a href="#">{this.state.user.name}</a></li>
              <li><a href="#" onClick={this.myBook}>My Book</a></li>
              <li><a href="#/family/recipes">Family Book</a></li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li><div className="dropdown">
                <img className="btn btn-default dropdown-toggle profile-pic"
                      type="button" id="dropdownMenu1"
                      data-toggle="dropdown" aria-haspopup="true"
                      aria-expanded="true"
                      src={this.state.user.image}>
                </img>
                <ul className="dropdown-menu mine" aria-labelledby="dropdownMenu1">
                   <li><Pic/></li>
                   <li><a href="#" onClick={this.unGroup}>Leave Group</a></li>
                   <li><a href="#" onClick={this.logout}>Logout</a></li>
                 </ul>
              </div></li>
            </ul>
          </div>
            {this.props.children}
        </nav>
      )
    }

  })
}(this));
