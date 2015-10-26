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
    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

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
      var request = RequestStore.find(e.currentTarget.dataset.id)
      this.setState({showModal: true, answerable: request})
    },

    hideModal: function (e) {
      if (e.target === e.currentTarget) {
        this.setState({showModal: false})
      }
    },

    closeModal: function () {
      this.history.pushState(null, "/family/recipes")
    },

    render: function () {
      var modal;
      var head;
      if (this.state.showModal) {
        modal = ( <section id="modal" onClick={this.hideModal}>
                    <RecipeModal editting={true}
                                  hideModal={this.closeModal}
                                  recipe={_newRecipe(this.state.answerable)}
                                  request={this.state.answerable.id}
                                  />
                  </section>)
      }
      if(this.state.requests.length !== 0 ) {
        head = <h2>Recipe Requests:</h2>
      }
      return (
        <div>
          {head}
          <ul className="list-group">
            {this.state.requests.map(function(request){
              return (
                <li className="list-group-item requests"
                    data-id={request.id}
                    key={"request"+request.id}
                    onClick={this.answerRequest}>
                  <strong>{request.title}</strong>
                  <div className="click-hide">{request.description}</div>
                  <div>requested by {UserStore.find(request.user_id).name}</div>
                  <a href="#" >Share this recipe!</a>
                </li>
              )
            }.bind(this))}
          </ul>
          <h2>Request a recipe</h2>
          <form>
            <div className="form-group">
              <label className="col-xs-3" htmlFor="title">Recipe</label>
              <input className="col-xs-9" type="text" id="title"
                valueLink={this.linkState("title")}></input>
            </div>
            <div className="form-group">
              <label className="col-xs-3" htmlFor="description">Description</label>
              <input className="col-xs-9" type="text" id="description"
                valueLink={this.linkState("description")}>
              </input>
            </div>
            <div className="form-group">
              <input className="col-xs-9 col-xs-offset-3"
                      type="submit"
                      onClick={this.makeRequest}></input>
            </div>
          </form>
          {modal}
        </div>
      )
    }
  })
}(this));
