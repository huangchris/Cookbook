(function(root) {
  'use strict';
  root.Wall = React.createClass({
    render: function () {
      return (
        <div className="col-xs-8">
            <h2>Comments</h2>
            <Comments parentType="Group" ID={FamilyStore.family().id}/>
            <Requests/>
        </div>
      )
    }
  })
}(this));
