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
    var admin;
    var img;
    if (this.props.editting){
      if(UserStore.admins().indexOf(this.props.user.id) === -1) {
        promote = <div data-id={this.props.user.id}
                       className="adminize col-xs-3"
                       onClick={this.adminize}>Make Admin</div>
        kick = <span className="glyphicon glyphicon-remove-circle col-xs-3"
                     data-id={this.props.user.id}
                     onClick={this.kickMember}></span>
      } else {
        kick=<div className="col-xs-3"></div>
        admin = <div className="admin col-xs-3">Admin</div>
      }
    }else{
      img = <img className="profile-pic"
           src={this.props.user.image || "/assets/user_icon.png"}></img>
    }
    //  || "/assets/user_icon" in img src
    return (
      <li className="family-index-item list-group-item" onClick={this.handleClick}>
        {kick}
        {img}
        <div className="col-xs-6"><h5>{this.props.user.name}</h5></div>
        {promote}
        {admin}
      </li>
    )
  }
})
}(this));
