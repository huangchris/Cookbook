(function(root) {
  'use strict';
  root.Family = React.createClass({
    getInitialState: function () {
      return {family: UserStore.family(), users: UserStore.all(), editting: false}
    },

    componentDidMount: function () {
      APIUtil.fetchFamily()
      UserStore.on(StoreConst.CURRENT_FAMILY, function () {
        this.setState({family: UserStore.family(), users: UserStore.all()})
      }.bind(this))
    },

    editGroup: function() {
      this.setState({editting: !this.state.editting})
    },
    addUser: function(e) {
      debugger;
      APIUtil.approveUser(e.target.dataset.id)
    },

    render: function () {
      if (this.state.family.id) {
        var editOptions;
        if( UserStore.admin() && !this.state.editting) {
          editOptions = <li onClick={this.editGroup}>Edit Group</li>
        } else if (this.state.editting) {
          editOptions = <li onClick={this.editGroup}>Done</li>
        }
        var pendingUsers;
        if (UserStore.admin() ) {
          pendingUsers = (
            <ul>
              <h4>Pending Users</h4>
              {UserStore.pendingUsers().map(function(user) {
                return <li key={user.id} >
                  {user.name}
                  <div onClick={this.addUser} data-id={user.id}>Add User</div>
                </li>
              }.bind(this))}
            </ul>
          )
        }
        return (
          <div>
            <h2>{this.state.family.name}</h2>
            <ul className= "list-group">
              {this.state.users.map(function(user){
                return <li key={user.id}><FamilyMember editting={this.state.editting} user={user} /></li>
                // return <li key={user.id}>{user.name}</li>
              }.bind(this))}
              {pendingUsers}
              {editOptions}
            </ul>
          </div>
        )
      } else {
        return <div>You don't have a family yet. Make or Join one!
          <FamilyFinder/>
        </div>
      }
    }
  })
}(this));
