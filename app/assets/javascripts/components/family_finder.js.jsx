(function(root) {
  'use strict';
  root.FamilyFinder = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
      return({name: ""})
    },

    componentDidMount: function() {
      // APIUtil.getFamilies();
      // FamilyStore.on(StoreConst.FAMILIES, function(){
      //   this.setState({familyList: FamilyStore.families()})
      // }.bind(this))
      // Since we're making a subcomponent FamilyList, this should be there.
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

      </div>
    }
          //so apparently you can't put comments inside the render divs... interesting.
          //index of all families with a "join" button for each
          // ooh... or, select one and click one join button

  })
}(this));
