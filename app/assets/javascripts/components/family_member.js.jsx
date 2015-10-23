(function(root) {
  'use strict';
root.FamilyMember = React.createClass ({
  mixins: [ReactRouter.History],

  handleClick: function() {
    var path = "/member/"+this.props.user.id+"/recipes";
    this.history.pushState({id: this.props.user.id}, path);
    APIUtil.getRecipeIndex()
  },

  kickMember: function (e) {
    APIUtil.kickMember(e.target.dataset.id)
  },

  adminize: function (e) {
    APIUtil.promoteMember(e.target.dataset.id)
  },

  render: function () {
    var kick;
    var promote;
    if (this.props.editting && UserStore.admins().indexOf(this.props.user.id) === -1) {
      promote = <div data-id={this.props.user.id} onClick={this.adminize}>Make Admin</div>
      kick = <div data-id={this.props.user.id} onClick={this.kickMember}>Remove</div>
    }
    //  || "/assets/user_icon" in img src
    return (
      <div className="family-index-item list-group-item" onClick={this.handleClick}>
        {kick}
        <img className="profile-pic"  src={this.props.user.image || "/assets/user_icon.png"}></img>
        <div>{this.props.user.name}</div>
        {promote}
      </div>
    )
  }
})
}(this));
