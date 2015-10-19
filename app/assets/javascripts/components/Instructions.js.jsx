(function(root) {
  'use strict';
  root.Instructions = React.createClass({
    getInitialState: function () {
      return {listCount: 1};
    },

    handleChange: function (e) {
      e.preventDefault();
      // this seems weird. but otherwise it updates it anyways; it's possible
      // that we don't have a 2-way link yet.
      this.props.parent.state.instructions[e.target.dataset.id] = e.target.value
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
                    value={this.props.parent.state.instructions.i}
                    data-id={i}>
                  </input>)
        // list.push(<br/>)
      }
      return (
        <div>
          {list}
          <button onClick={this.addListItem}>Add an instruction</button>
        </div>
      )
    }
  })
}(this));
