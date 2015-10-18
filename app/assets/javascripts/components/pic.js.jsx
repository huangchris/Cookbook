(function(root) {
  'use strict';
  root.Pic = React.createClass({
    mixins: [ReactRouter.History],

    handleClick: function (e) {
      e.preventDefault();
      cloudinary.openUploadWidget(window.CLOUDINARY_OPTIONS,
        function (error, response) {
          if(error) {} //{alert("picture failed to upload")}
          //maybe add an errors store? or maybe just do nothing?
          //most of the time this pops up because I canceled the widget.
          else{
            APIUtil.updateProfilePic(response[0].url)
          }
        }
      );
    },

    render: function () {
      if(!this.props.user.image) {
        return (
          <a className="UploadPic"
            onClick={this.handleClick}>
            Upload a Profile Picture</a>
        )}
      else {
        return (
          <a onClick={this.handleClick}>
            <img className="profile-pic"
              src={this.props.user.image} />
            <div>Change Picture</div>
          </a>
        )
      }
    }
  })
}(this));
