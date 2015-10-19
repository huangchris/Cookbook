(function(root) {
  'use strict';
  root.Ingredients = React.createClass({
    getInitialState: function () {
      return {listCount: this.props.parent.state.ingredients.length};
    },

    handleChange: function (e) {
      this.props.parent.state.ingredients[e.target.dataset.id].ing = e.target.value
      this.forceUpdate();
    },

    addListItem: function (e) {
      e.preventDefault();
      this.props.parent.state.ingredients[this.state.listCount] = {};
      this.setState({listCount: this.state.listCount + 1})
    },

    render: function () {
      var list = []
      for (var i = 0; i < this.state.listCount; i++) {
        list.push(<input type="text" key={i}
                    onChange={this.handleChange}
                    data-id={i}
                    value={this.props.parent.state.ingredients[i].ing}>
                  </input>)
        list.push(<br/>)
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
