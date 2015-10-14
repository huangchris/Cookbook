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


    render: function () {
      if (this.state.family.id) {
        var editOptions
        if( UserStore.admin === true && !this.state.editting) {
          editOptions = <li onClick={this.editGroup}>Edit Group</li>
        } else if (this.state.editting) {
          editOptions = <li onClick={this.editGroup}>Done</li>
        }

        return (
          <div>
            <div>{this.state.family.name}</div>
            <ul>
              {this.state.users.map(function(user){
                // return <li editting={this.state.editting} key={user.id}> {FamilyMember}</li>
                return <li key={user.id}>{user.name}</li>
              })}
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
