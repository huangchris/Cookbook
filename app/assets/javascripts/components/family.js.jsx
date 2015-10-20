(function(root) {
  'use strict';
  root.Family = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      return {family: UserStore.family(), users: UserStore.all(), editting: false}
    },

    storeListener:  function () {
      this.setState({family: UserStore.family(), users: UserStore.all()})
    },

    componentDidMount: function () {
      UserStore.on(StoreConst.CURRENT_FAMILY, this.storeListener)
    },

    componentWillUnmount: function () {
      UserStore.removeListener(StoreConst.CURRENT_FAMILY, this.storeListener)
    },

    editGroup: function() {
      this.setState({editting: !this.state.editting})
    },
    addUser: function(e) {
      APIUtil.approveUser(e.target.dataset.id)
    },

    sharedBook: function() {
      if(!UserStore.isPending()){
        this.history.pushState({index:"shared"},"/family/recipes")
      }else { alert("You can't view that until your join request is approved")}
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
                  <button onClick={this.addUser} data-id={user.id}>Approve</button>
                </li>
              }.bind(this))}
            </ul>
          )
        }
        return (
          <div>
          <div className="col-xs-4">
            <h2>{this.state.family.name}</h2>
            <ul className= "list-group">
              <li key={"shared"}
                  onClick={this.sharedBook}>
                <div className="family-index-item list-group-item">Shared Recipes</div></li>
              {this.state.users.map(function(user){
                return <li key={user.id}>
                    <FamilyMember editting={this.state.editting}
                                  user={user} />
                </li>
              }.bind(this))}
              {pendingUsers}
              {editOptions}
            </ul>
          </div>
          {this.props.children}
        </div>
        )
      } else {
        return <div className="col-xs-4">You don't have a family yet. Make or Join one!
          <FamilyFinder/>
        </div>
      }
    }
  })
}(this));
