(function(root) {
  'use strict';
  root.FamilyList = React.createClass({
    getInitialState: function () {
      return {familyList: [], selected: null};
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

    selectFamily: function(e) {
      this.setState({selected: e.target.dataset.id})
    },

    joinFamily: function(e) {
      APIUtil.joinFamily(this.state.selected)
    },

    render: function () {
      return(
        <ul className="list-group">
          {this.state.familyList.map(function(family){
            var selected = (parseInt(this.state.selected) === family.id ?
              "selected-family" : "")
            return <li key={family.id}
                    className={selected + "list-group-item"}
                    data-id={family.id}
                    onClick={this.selectFamily}>
                    {family.name}</li>
          }.bind(this))}
          <li className="list-group-item"
              onClick={this.joinFamily}>Request to Join!
          </li>
        </ul>
      )
    }
  });
}(this));
