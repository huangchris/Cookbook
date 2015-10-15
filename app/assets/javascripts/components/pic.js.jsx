(function(root) {
  'use strict';
  root.Pic = React.createClass({
    mixins: [ReactRouter.History],

    handleClick: function () {
      cloudinary.openUploadWidget(window.CLOUDINARY_OPTIONS,
        function (error, response) {
          if(error) {alert("picture failed to upload")}
          //maybe add an errors store? or maybe just do nothing?
          //most of the time this pops up because I canceled the widget.
          else{
            APIUtil.updateProfilePic(response[0].url)
          }
        }
      );
    },

    clickBack: function() {
      this.history.pushState(null, "/")
    },

    render: function () {
      if(!this.props.user.image) {
        return (
          <div className="UploadPic"
            onClick={this.handleClick}>
            Upload a Profile Picture</div>
        )}
      else {
        return (
          <div>
            <img className="profile-pic"
              onClick={this.clickBack}
              src={this.props.user.image} />
            <div className="UploadPic"
              onClick={this.handleClick}>
              Change Picture</div>
          </div>
        )
      }
    }
  })
}(this));
