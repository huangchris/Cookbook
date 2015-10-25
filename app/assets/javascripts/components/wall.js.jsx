(function(root) {
  'use strict';
  root.Wall = React.createClass({
    getInitialState: function () {
      return {id: null}
    },

    componentDidMount: function () {
      FamilyStore.on(StoreConst.CURRENT_FAMILY, this.storeListener)
    },

    storeListener: function () {
      this.setState({id: FamilyStore.family().id})
    },

    componentWillUnmount: function () {
      FamilyStore.removeListener(StoreConst.CURRENT_FAMILY, this.storeListener)
    },

    render: function () {
      return (
        <div className="col-xs-8 sub-container">
            <Requests/>
            <h2>Comments</h2>
            <Comments parentType="Group" ID={this.state.id}/>
        </div>
      )
    }
  })
}(this));
