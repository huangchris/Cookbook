(function(root) {
  'use strict';
  root.FamilyFinder = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
      return({name: ""})
    },


    makeFamily: function(e) {
      e.preventDefault();
      APIUtil.makeFamily(this.state);
    },

    render: function() {
      return <div className="col-xs-8 sub-container">
        You're not a member of a family yet.  <strong>Create a new one:</strong>
        <form onSubmit={this.makeFamily}>
          Name:<input type="text" valueLink={this.linkState("name")}></input>
          <input type="submit"></input>
        </form>
        <strong>Or join an existing one:</strong>
        <FamilyList/>
      </div>
    }
          //so apparently you can't put comments inside the render divs... interesting.
          //index of all families with a "join" button for each
          // ooh... or, select one and click one join button

  })
}(this));
