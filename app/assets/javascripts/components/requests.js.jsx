(function(root) {
  'use strict';

  var _newRecipe = function(state){
    return {
      id: null, user_id: null, group_id: null,
      personal: false, title: state.title, photo: "",
      description: state.description, ingredients: [{}], instructions: [{}],
      search_tags: [{}], tab_tag_id: 1
    };
  };

  root.Requests = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
      return({requests: [], title: "", description: "",
        showModal: false, answerable: {} })
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

    answerRequest: function (e) {
      e.preventDefault();
      var request = RequestStore.find(e.target.dataset.id)
      this.setState({showModal: true, answerable: request})
    },

    render: function () {
      var modal;
      if (this.state.showModal) {
        modal = ( <section id="modal" onClick={Recipes.hideModal}>
                    <RecipeModal editting={true}
                                  hideModal={Recipes.closeModal}
                                  recipe={_newRecipe(this.state.answerable)}
                                  />
                  </section>)
      }
      return (
        <div className="col-xs-12">
          <h2>Requested Recipes:</h2>
          <ul>
            {this.state.requests.map(function(request){
              return (
                <li key={"request"+request.id} data-id={request.id}>
                  {request.title}
                  <div className="click-hide">{request.description}</div>
                  <a href="#" onClick={this.answerRequest}>Give the recipe!</a>
                </li>
              )
            }.bind(this))}
          </ul>
          <h2>Request a recipe</h2>
          <form>
            <label htmlFor="title">Recipe</label>
            <input type="text" id="title"
              valueLink={this.linkState("title")}></input>
            <label htmlFor="description">Description</label>
            <input type="text" id="description"
              valueLink={this.linkState("description")}>
            </input>
            <input type="submit" onClick={this.makeRequest}></input>
          </form>
          {modal}
        </div>
      )
    }
  })
}(this));
