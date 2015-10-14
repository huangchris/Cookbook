(function(root) {
  'use strict';
root.FamilyMember = React.createClass ({
  handleClick: function() {
    //history.pushState(/recipes)
  },

  kickMember: function () {
    console.log("call APIUtil and delete a user_group")
  },

  adminize: function () {
    console.log("call APIUtil and update a user_group to 'admin'")
  },

  render: function () {
    var kick;
    var promote;
    // for whatever reason, false has evaluated truthy before...
    // update: because I'm dumb and didn't invoke a function, just looked at it.
    if (this.props.editting ) {
      kick = <div onClick={this.kickMember}>Remove</div>
      promote = <div onClick={this.adminize}>Make Admin</div>
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
