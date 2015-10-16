(function(root) {
  'use strict';
  root.Recipes = React.createClass({

    storeListener: function(){
      this.setState({Recipes: RecipeStore.all()})
    },

    componentDidMount: function() {
      APIUtil.getRecipeIndex(this.props.routes[1], this.props.routeParams.id);
      RecipeStore.on(StoreConst.RECIPE_INDEX, this.storeListener)
    },

    componentWillUnmount: function() {
      RecipeStore.removeListener(StoreConst.RECIPE_INDEX, this.storeListener)
    },

    render: function () {
      return <div className="col-xs-8">Recipes should be here</div>
    }
  });
}(this));
