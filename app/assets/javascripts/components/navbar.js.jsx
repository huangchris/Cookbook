(function(root) {
  'use strict';
  root.Navbar = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {user: UserStore.currentUser()}
    },

    clickBack: function(e) {
      if (e.target === e.currentTarget) {
        this.History.pushState(null, "/")
      }
    },

    componentDidMount: function () {
      UserStore.on(StoreConst.CURRENT_USER, function () {
        this.setState({user: UserStore.currentUser()})
      }.bind(this))
    },

    familyClick: function() {
      this.history.pushState(null, "/family")
    },

    render: function () {
      return (
        <div onClick={this.clickBack}>
          <ul className="Nav list-group">
            <li className="list-group-item"><Pic user={this.state.user}/></li>
            <li className="list-group-item" onClick={this.familyClick}>Family</li>
          </ul>
          {this.props.children}
        </div>
      )
    }

  })
}(this));
