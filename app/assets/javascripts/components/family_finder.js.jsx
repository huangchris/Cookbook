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
      return <div>
        You're not a member of a family yet.  Create a new one:
        <form onSubmit={this.makeFamily}>
          Name:<input type="text" valueLink={this.linkState("name")}></input>
          <input type="submit"></input>
        </form>
        Or join an existing one:
        <FamilyList/>
      </div>
    }
          //so apparently you can't put comments inside the render divs... interesting.
          //index of all families with a "join" button for each
          // ooh... or, select one and click one join button

  })
}(this));
