(function(root) {
  'use strict';
  root.Pending = React.createClass({
    render: function() {
      return (
        <div className="col-xs-8">
          <h5>You have requested to join a family! Until a member of the
            family approves your request, you will have limited
            permissions. If you are trying to create your own recipes,
            you can leave the family you requested to join and create your
            own. Or, if you are looking for an example, you can view a guest
            account <a onclick={demoLogin}>here</a></h5>
        </div>
      )
    }
  })
}(this));
