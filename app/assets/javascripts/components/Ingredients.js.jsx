(function(root) {
  'use strict';
  root.Ingredients = React.createClass({
    getInitialState: function () {
      return {listCount: 1};
    },

    handleChange: function (e) {
      this.props.parent.state.ingredients[e.target.dataset.id] = e.target.value
      this.forceUpdate();
    },

    addListItem: function (e) {
      e.preventDefault();
      this.setState({listCount: this.state.listCount + 1})
    },

    render: function () {
      var list = []
      for (var i = 0; i < this.state.listCount; i++) {
        list.push(<input type="text" key={i}
                    onChange={this.handleChange}
                    data-id={i}
                    value={this.props.parent.state.ingredients.i}>
                  </input>)
      }
      return (
        <div>
          {list}
          <button onClick={this.addListItem}>Add an ingredient</button>
        </div>
      )
    }
  })
}(this));
