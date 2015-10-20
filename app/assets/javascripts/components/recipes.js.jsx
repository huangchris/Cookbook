  // EUTM
(function(root) {
  'use strict';
  var _blankRecipe = {
    id: null, user_id: null, group_id: null,
    personal: false, title: "", photo: "",
    description: "", ingredients: [{}], instructions: [{}],
    search_tags: [{}]
  }

  root.Recipes = React.createClass({
    getInitialState: function(){
      return({recipes: [], activeRecipe: _blankRecipe, editting: false,
        showModal: false, tabs: TagStore.all()})
    },

    storeListener: function(){
      this.setState({recipes: RecipeStore.all()})
    },

    tagListener: function() {
      this.setState({tabs: TagStore.all()})
    },

    componentDidMount: function() {
      // this seems bad.
      APIUtil.getRecipeIndex(this.props.routes[1], this.props.routeParams.id);
      APIUtil.getTabTags(this.props.routes[1], this.props.routeParams.id);
      RecipeStore.on(StoreConst.RECIPE_INDEX, this.storeListener)
      TagStore.on(StoreConst.TAB_TAGS, this.tagListener)
    },

    componentWillUnmount: function() {
      RecipeStore.removeListener(StoreConst.RECIPE_INDEX, this.storeListener)
      TagStore.removeListener(StoreConst.TAB_TAGS, this.tagListener)
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
      this.setState({activeRecipe: recipe, editting: edit,
        showModal: true})
    },

    hideModal: function (e) {
      if (e.target === e.currentTarget) {
        this.setState({showModal: false})
      }
    },

    closeModal: function () { this.setState({showModal: false})},

    tabClick: function(e) {
      if(e.target === e.currentTarget) {return;}
      $(e.currentTarget).children().removeClass("active")
      $(e.target).parent().addClass("active")
      var tabID = $(e.target).parent().data().id
      if (tabID === "All") {
        this.setState({recipes: RecipeStore.all()})
      }else {
        this.setState({recipes: RecipeStore.filterByTag(tabID)})
      }
    },

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
          <ul className="nav nav-tabs" onClick={this.tabClick}>
            <li data-id="All" className="active"><a>All Recipes</a></li>
            {this.state.tabs.map(function(tag){
              return <li data-id={tag.id}><a>{tag.data}</a></li>
            })}
          </ul>
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
