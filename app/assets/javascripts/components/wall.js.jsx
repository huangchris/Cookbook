(function(root) {
  'use strict';
  root.Wall = React.createClass({
    getInitialState: function () {
      return {id: null}
    },

    componentDidMount: function () {
      FamilyStore.on(FamilyStore.CURRENT_FAMILY, this.storeListener)
    },

    storeListener: function () {
      this.setState({id: FamilyStore.family().id})
    },

    componentWillUnmount: function () {
      FamilyStore.removeListener(FamilyStore.CURRENT_FAMILY, this.storeListener)
    },

    render: function () {
      return (
        <div className="col-xs-8">
            <h2>Comments</h2>
            <Comments parentType="Group" ID={this.state.id}/>
            <Requests/>
        </div>
      )
    }
  })
}(this));
