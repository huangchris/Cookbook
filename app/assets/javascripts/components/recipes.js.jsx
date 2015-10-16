(function(root) {
  'use strict';
  root.Recipes = React.createClass({
    getInitialState: function(){
      return({recipes: []})
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

    render: function () {
      return (
        <div className="col-xs-8">
          <h2>Recipes</h2>
          <h4>will be tabbed by category</h4>
          <ul className="list-group">
            {this.state.recipes.map(function(recipe){
              return <li key={recipe.id}
                        className="list-group-item">
                        {recipe.title}
                     </li>
            })}
          </ul>
        </div>
      )
    }
  });
}(this));
