(function(root) {
  'use strict';
  root.Pic = React.createClass({
    handleClick: function () {
      cloudinary.openUploadWidget(window.CLOUDINARY_OPTIONS,
        function (error, response) {
          if(error) {alert("picture failed to upload")}
          //maybe add an errors store?
          else{
            APIUtil.updateProfilePic(response[0].url)
          }
        }
      );
    },


    render: function () {
      debugger;
      if(!this.props.user.image) {
        return (
          <div className="UploadPic"
            onClick={this.handleClick}>
            Upload a Profile Picture</div>
        )}
      else {
        return <img src={this.props.user.image} />
      }
    }
  })
}(this));
