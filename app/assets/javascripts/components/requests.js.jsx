(function(root) {
  'use strict';
  root.Requests = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
      return({requests: [], title: "", description: ""})
    },

    componentWillMount: function () {
      APIUtil.getRequests();
      RequestStore.on(StoreConst.REQUESTS,this.storeListener)
    },

    storeListener: function () {
      this.setState({requests: RequestStore.all()})
    },

    componentWillUnmount: function () {
      RequestStore.removeListener(StoreConst.REQUESTS,this.storeListener)
    },

    makeRequest: function(e) {
      e.preventDefault();
      if (this.state.title){
        APIUtil.createRequest(this.state);
      } else {
        console.log("tried to make an empty request")
      }
    },

    render: function () {
      return (
        <div className="col-xs-12">
          <h2>Requested Recipes:</h2>
          <ul>
            {this.state.requests.map(function(request){
              return (
                <li>
                  {request.title}
                  <div className="click-hide">{request.description}</div>
                  <a href="#">Give the recipe!</a>
                </li>
              )
            })}
            <li> A request <a href="#">Give the recipe!</a></li>
            <li> Another request <a href="#">Give the recipe!</a></li>
            <li> A last request <a href="#">Give the recipe!</a></li>
          </ul>
          <h2>Request a recipe</h2>
          <form>
            <label for="title">Recipe</label>
            <input type="text" id="title"
              valueLink={this.linkState("title")}></input>
            <label for="description">Description</label>
            <input type="text" id="description"
              valueLink={this.linkState("description")}>
            </input>
            <input type="submit" onClick={this.makeRequest}></input>
          </form>
        </div>
      )
    }
  })
}(this));
