(function(root) {
  'use strict';
  root.Navbar = React.createClass({
    getInitialState: function() {
      return {user: UserStore.currentUser()}
    },

    componentDidMount: function () {
      UserStore.on(StoreConst.CURRENT_USER, function () {
        this.setState({user: UserStore.currentUser()})
      }.bind(this))
    },

    render: function () {
      return (
        <ul className="Nav list-group">
          <li className="list-group-item"><Pic user={this.state.user}/></li>
          <li className="list-group-item">Another Item</li>
        </ul>
      )
    }

  })
}(this));
