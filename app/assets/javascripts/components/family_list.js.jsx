(function(root) {
  'use strict';
  root.FamilyList = React.createClass({
    getInitialState: function () {
      return {familyList: []};
    },

    storeListener: function () {
      this.setState({familyList: FamilyStore.families()})
    },
    componentDidMount: function() {
      APIUtil.getFamilies();
      FamilyStore.on(StoreConst.FAMILIES, this.storeListener)
    },

    componentWillUnmount: function () {
      FamilyStore.removeListener(StoreConst.FAMILIES, this.storeListener)
    },

    render: function () {
      return <div>This is where a list of {this.state.familyList.length} families would go</div>
    }
  })
}(this));
