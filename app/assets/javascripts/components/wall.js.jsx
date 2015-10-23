(function(root) {
  'use strict';
  root.Wall = React.createClass({
    render: function () {
      return (
        <div>
          This is where group comments and requests would go.
            <h2>Comments</h2>
            <Comments parentType="Group" ID={FamilyStore.family().id}/>
        </div>
      )
    }
  })
}(this));
