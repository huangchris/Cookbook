(function(root) {
  'use strict';
root.FamilyMember = React.createClass ({
  mixins: [ReactRouter.History],

  handleClick: function() {
    var path = "/member/"+this.props.user.id+"/recipes";
    this.history.pushState(null, path);
    APIUtil.getRecipeIndex({path: "/member/:id/recipes"},this.props.user.id)
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
