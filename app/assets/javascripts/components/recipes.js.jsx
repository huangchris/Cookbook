(function(root) {
  'use strict';
  var _blankRecipe = {
    id: null, user_id: null, group_id: null,
    personal: false, title: "", photo: "",
    description: "", ingredients: "", instructions: ""
  }

  root.Recipes = React.createClass({
    getInitialState: function(){
      return({recipes: [], activeRecipe: _blankRecipe, editting: false, showModal: false})
    },

    storeListener: function(){
      this.setState({recipes: RecipeStore.all()})
    },

    componentDidMount: function() {
      APIUtil.getRecipeIndex(this.props.routes[1], this.props.routeParams.id);
      RecipeStore.on(StoreConst.RECIPE_INDEX, this.storeListener)
    },

    componentWillUnmount: function() {
      RecipeStore.removeListener(StoreConst.RECIPE_INDEX, this.storeListener)
    },

    openRecipe: function(e) {
      var recipe, edit;
      if(e.target.dataset.id === undefined) {
        recipe = _blankRecipe;
        edit = true;
      } else {
        recipe = RecipeStore.find(e.target.dataset.id)
        edit = false;
      }
      this.setState({activeRecipe: recipe, editting: edit, showModal: true})
      //not sure I need this now.
        // $("#modal").addClass("active-modal")
        // $("#modal").removeClass("hidden-modal")
    },

    hideModal: function (e) {
      if (e.target === e.currentTarget) {
        this.setState({showModal: false})
      }
    },

    closeModal: function () { this.setState({showModal: false})},

    render: function () {
      var modal;
      if (this.state.showModal) {
        modal = ( <section id="modal" onClick={this.hideModal}>
                    <RecipeModal editting={this.state.editting}
                                  hideModal={this.closeModal}
                                  recipe={this.state.activeRecipe}
                                  />
                  </section>)
      }
      return (
        <div className="col-xs-8">
          <h2>Recipes</h2>
          <h4>will be tabbed by category</h4>
          <ul className="list-group" onClick={this.openRecipe}>
            {this.state.recipes.map(function(recipe){
              return <li key={recipe.id}
                        className="list-group-item"
                        data-id={recipe.id}>
                        {recipe.title}
                     </li>
            })}
            <li key="new"><button>Add a new Recipe</button></li>
          </ul>
          {modal}
        </div>
      )
    }
  });
}(this));
