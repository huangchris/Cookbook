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


    render: function () {
      if (this.state.family.id) {
        var editOptions
        if( UserStore.admin() && !this.state.editting) {
          editOptions = <li onClick={this.editGroup}>Edit Group</li>
        } else if (this.state.editting) {
          editOptions = <li onClick={this.editGroup}>Done</li>
        }
        return (
          <div>
            <div>{this.state.family.name}</div>
            <ul className= "list-group">
              {this.state.users.map(function(user){
                return <li key={user.id}><FamilyMember editting={this.state.editting} user={user} /></li>
                // return <li key={user.id}>{user.name}</li>
              }.bind(this))}
              {editOptions}
            </ul>
          </div>
        )
      } else {
        return <div>You don't have a family yet. Make or Join one!</div>
      }
    }
  })
}(this));
