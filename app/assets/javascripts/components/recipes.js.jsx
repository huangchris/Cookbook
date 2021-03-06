  // EUTM
(function(root) {
  'use strict';
  var _blankRecipe = {
    id: null, user_id: null, group_id: null,
    personal: false, title: "", photo: "",
    description: "", ingredients: [{}], instructions: [{}],
    search_tags: [{}], tab_tag_id: 1
  }

  root.Recipes = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function(){
      return({recipes: [], activeRecipe: _blankRecipe, editting: false,
        showModal: false, tabs: TagStore.all()})
    },

    storeListener: function(){
      if(window.location.hash.startsWith("#/member")) {
        this.setState({recipes: RecipeStore.allByUser(window.location.hash[9])})
      } else if (window.location.hash.startsWith("#/family")) {
        this.setState({recipes: RecipeStore.allFamily()})
      } else {
        this.setState({recipes: RecipeStore.allByUser(window.USER_ID)})
      }
    },

    tagListener: function() {
      this.setState({tabs: TagStore.all()})
    },

    componentDidMount: function() {
      // this seems bad.
      this.tabID = "All";
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
        this.setState({showModal: false, editting:false})
      }
    },

    closeModal: function () { this.setState({showModal: false, editting:false})},

    tabClick: function(e) {
      if(e.target === e.currentTarget) {return;}
      $(e.currentTarget).children().removeClass("active")
      $(e.target).parent().addClass("active")
      this.tabID = $(e.target).parent().data().id
      this.setState({recipes: RecipeStore.filterByTag(this.tabID)})
    },

    searchRecipes: function(e) {
      this.setState({recipes: RecipeStore.search(e.target.value)})

      // Moved into store.
      // var recipes = (this.tabID === "All" ? RecipeStore.all() :
      //     RecipeStore.filterByTag(this.tabID))
      // this.setState({recipes: recipes.filter(function(recipe){
      //     return (recipe.title.toLowerCase().startsWith(e.target
      //                                       .value.toLowerCase()) ||
      //           recipe.search_tags.some(function(tag){
      //             return tag.data.toLowerCase().startsWith(e.target
      //                                         .value.toLowerCase())
      //           }))
      //   })})
    },

    render: function () {
      var modal;
      var newRecipeButton;
      if (!window.location.hash.startsWith("#/member")) {
        newRecipeButton = <li key="new"><button
          className="form-control">Add a new Recipe</button></li>
      }
      if (this.state.showModal) {
        modal = ( <section id="modal" onClick={this.hideModal}
                      onKeyDown={this.escape}>
                    <RecipeModal editting={this.state.editting}
                                  hideModal={this.closeModal}
                                  recipe={this.state.activeRecipe}
                                  />
                  </section>)
      }
      return (
        <div className="col-xs-8 sub-container">
          <h2>Recipes</h2>

          <div className="row">
            <label className="col-xs-2">Search</label>
            <input className="col-xs-8" type="text"
                onChange={this.searchRecipes}></input>
            <div className="col-xs-2"></div>
          </div>

          <ul className="nav nav-tabs" onClick={this.tabClick}>
            <li key="tabAll" data-id="All" className="active"><a>All Recipes</a></li>
            {this.state.tabs.map(function(tag){
              return <li key={"tab" + tag.id} data-id={tag.id}><a>{tag.data}</a></li>
            })}
          </ul>
          <ul className="list-group" onClick={this.openRecipe}>
            {this.state.recipes.map(function(recipe){
              return <li key={recipe.id}
                        className="list-group-item recipe-item"
                        data-id={recipe.id}>
                        <img src={recipe.photo}
                          data-id={recipe.id}
                          className="thumbnail mine" ></img>
                        <div data-id={recipe.id}><h4 data-id={recipe.id}>{recipe.title}</h4></div>
                     </li>
            })}
            {newRecipeButton}
          </ul>
          {modal}
        </div>
      )
    }
  });
}(this));
