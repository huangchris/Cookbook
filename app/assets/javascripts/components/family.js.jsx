(function(root) {
  'use strict';
  root.Family = React.createClass({
    getInitialState: function () {
      return {family: UserStore.family(), users: UserStore.all()}
    },

    componentDidMount: function () {
      APIUtil.fetchFamily()
      UserStore.on(StoreConst.CURRENT_FAMILY, function () {
        this.setState({family: UserStore.family(), users: UserStore.all()})
      }.bind(this))
    },

    clickUser: function() {},

    render: function () {
      if (this.state.family) {
        return (
          <div>
            <div>{this.state.family.name}</div>
            <ul>
              {this.state.users.map(function(user){
                return <li onClick={Family.clickUser}>{user.name}</li>
              })}
            </ul>
          </div>
        )
      } else {
        return <div>You don't have a family yet. Make or Join one!</div>
      }
    }
  })
}(this));
