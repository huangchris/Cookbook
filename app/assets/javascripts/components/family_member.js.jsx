(function(root) {
  'use strict';
root.FamilyMember = React.createClass ({
  handleClick: function() {
    //history.pushState(/recipes)
  },

  kickMember: function (e) {
    console.log("call APIUtil and delete a user_group")
    debugger;
    APIUtil.kickMember(e.target.dataset.id)
  },

  adminize: function (e) {
    debugger;
    console.log("call APIUtil and update a user_group to 'admin'")
    APIUtil.promoteMember(e.target.dataset.id)
  },

  render: function () {
    var kick;
    var promote;
    if (this.props.editting && !UserStore.isAdmin(this.props.user.id)) {
      promote = <div data-id={this.props.user.id} onClick={this.adminize}>Make Admin</div>
      kick = <div data-id={this.props.user.id} onClick={this.kickMember}>Remove</div>
    }
    return (
      <div className="family-index-item list-group-item" onClick={this.handleClick}>
        {kick}
        <img className="thumbnail"  src={this.props.user.image}></img>
        <div>{this.props.user.name}</div>
        {promote}
      </div>
    )
  }
})
}(this));
