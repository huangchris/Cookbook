(function(root) {
  'use strict';
  root.FamilyList = React.createClass({
    mixins: [ReactRouter.History],

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
      if(this.state.selected === e.target.dataset.id) {
        this.setState({selected: null})
      } else {
        this.setState({selected: e.target.dataset.id})
      }
    },

    joinFamily: function(e) {
      APIUtil.joinFamily(this.state.selected);
      this.history.pushState(null,"/pending")
    },

    render: function () {
      return(
        <ul className="list-group">
          {this.state.familyList.map(function(family){
            var selected = (parseInt(this.state.selected) === family.id ?
              "selected-family" : "")
            return <li key={family.id}
                    className={selected + " list-group-item family"}
                    data-id={family.id}
                    onClick={this.selectFamily}>
                    {family.name}</li>
          }.bind(this))}
          <li className="list-group-item family"
              onClick={this.joinFamily}>Request to Join!
          </li>
        </ul>
      )
    }
  });
}(this));
