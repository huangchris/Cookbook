(function(root) {
  'use strict';
  var _blankRecipe = {
    id: null, user_id: null, group_id: null,
    personal: false, title: "", photo: "",
    description: "", ingredients: "", instructions: ""
  }

  root.Recipes = React.createClass({
    getInitialState: function(){
      return({recipes: [], activeRecipe: _blankRecipe})
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
      debugger;
      if(e.target.dataset.id === undefined) {
        this.setState({activeRecipe: _blankRecipe})
      } else {
        this.setState({activeRecipe: RecipeStore.find(e.target.dataset.id)})
      }
        $("#modal").addClass("active-modal")
        $("#modal").removeClass("hidden-modal")
    },

    render: function () {
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
            <RecipeModal recipe={this.state.activeRecipe}/>
        </div>
      )
    }
  });
}(this));
