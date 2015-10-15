(function(root) {
  'use strict';
  root.FamilyFinder = React.createClass({

    componentDidMount: function() {
      APIUtil.getFamilies();
      FamilyStore.on(StoreConst.FAMILIES, function(){
        this.setState({familyList: FamilyStore.families()})
      }.bind(this))
    },
    render: function() {
      return <div>
        //<FamilyList/>
          //index of all families with a "join" button for each
          // ooh... or, select one and click one join button
        //<FamilyForm/>
          //just name and submit, yeah?  Could do that here then.
      </div>
    }

  })
}(this));
