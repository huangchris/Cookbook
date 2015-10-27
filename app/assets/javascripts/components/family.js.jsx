(function(root) {
  'use strict';
  root.Family = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      return {family: UserStore.family(), users: UserStore.all(), editting: false}
    },

    storeListener: function () {
      this.setState({family: UserStore.family(), users: UserStore.all()})
    },

    componentDidMount: function () {
      APIUtil.fetchFamily();
      UserStore.on(StoreConst.CURRENT_FAMILY, this.storeListener)
    },

    componentWillUnmount: function () {
      UserStore.removeListener(StoreConst.CURRENT_FAMILY, this.storeListener)
    },

    editGroup: function(e) {
      e.preventDefault();
      this.setState({editting: !this.state.editting});
    },

    addUser: function(e) {
      APIUtil.approveUser(e.target.dataset.id)
    },

    sharedBook: function() {
      this.history.pushState({id: 0},"/family/recipes")
    },

    render: function () {
      if (this.state.family.id) {
        var editOptions;
        if( UserStore.isAdmin() && !this.state.editting) {
          editOptions = <a href="#" onClick={this.editGroup}>Edit Group</a>
        } else if (this.state.editting) {
          editOptions = <a href="#" onClick={this.editGroup}>Done</a>
        }
        var pendingUsers;
        if (UserStore.isAdmin() && UserStore.pendingUsers().length > 0) {
          pendingUsers = (
            <ul className="list-group">
              <h4>Pending Users</h4>
              {UserStore.pendingUsers().map(function(user) {
                return <li key={user.id} >
                  {user.name}
                  <button onClick={this.addUser} data-id={user.id}>Approve</button>
                </li>
              }.bind(this))}
            </ul>
          )
        }
        return (
          <div>
          <div className="col-xs-4 sub-container">
            <h2>{this.state.family.name}</h2>
            <ul className= "list-group">
              <li key={"shared"}
                  onClick={this.sharedBook}>
                <div className="family-index-item list-group-item">{this.state.family.name} Recipes</div></li>
              {this.state.users.map(function(user){
                return <FamilyMember editting={this.state.editting}
                                  user={user} />
              }.bind(this))}
              {pendingUsers}
              {editOptions}
            </ul>
          </div>
          {this.props.children}
        </div>
        )
      } else {
        return <FamilyFinder/>
      }
    }
  })
}(this));
