(function(root) {
  'use strict';
  root.UploadPic = React.createClass({
    handleClick: function () {
      cloudinary.openUploadWidget(window.CLOUDINARY_OPTIONS,
        function (error, response) {
          if(error) {alert("picture failed to upload")}
          //maybe add an errors store?
          else{
            APIUtil.addprofilePic(response[0].url)
          }
        }
      );
    },

    render: function () {
      return (
        <div className="UploadPic"
            onClick={this.handleClick}>
      Upload a Profile Picture</div>)
    }
  })
}(this));
