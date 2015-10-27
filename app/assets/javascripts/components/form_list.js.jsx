(function(root) {
  'use strict';
  root.FormList = React.createClass({
    getInitialState: function () {
        var length = this.props.object.length === 0 ? 1 : this.props.object.length
      return {listCount: length};
    },

    handleChange: function (e) {
      this.props.object[e.target.dataset.id].data = e.target.value
      this.forceUpdate();
    },

    addListItem: function (e) {
      e.preventDefault();
      this.props.object[this.state.listCount] = {};
      this.setState({listCount: this.state.listCount + 1})
    },

    render: function () {
      var list = []
      for (var i = 0; i < this.state.listCount; i++) {
        list.push(<input type="text"
                    className="form-control"
                    key={i}
                    onChange={this.handleChange}
                    data-id={i}
                    value={this.props.object[i].data}>
                  </input>)
      }
      return (
        <div>
          {list}
          <button className="form-control"
            onClick={this.addListItem}>{this.props.buttonName}</button>
        </div>
      )
    }
  })
}(this));
