(function(root) {
  'use strict';
  root.Navbar = React.createClass({
    render: function () {
      return (
        <ul className="Nav list-group">
          <li className="list-group-item"><UploadPic/></li>
          <li className="list-group-item">Another Item</li>
        </ul>
      )
    }

  })
}(this));
