// ENTHUSIASM UNKNOWN TO MANKIND

(function(root) {
  'use strict';
  root.RecipeModal = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      return {editting: this.props.editting}
    },

    componentWillMount: function () {
      if(UserStore.isPending()) {
        alert("You can't view or add Recipes until you are an approved member of a family");
        this.history.pushState(null, "/family");
      }
    },

    // Probably don't need this:
    componentWillReceiveProps: function(newProps) {
      this.setState({editting: newProps.editting})
    },

    componentDidMount: function(){
    },
    // uh... we're calling this function still somehow?
    // hideModal: function(e) {
    //   if (e.target === e.currentTarget){
    //     $("#modal").removeClass("active-modal").addClass("hidden-modal")
    //     this.setState({editting: false})
    //   }
    // },

    editRecipe: function (e) {
      //maybe make the form and this visible/invisible, and put this back into the main?
      //or just put the button on the main?  that would be weird, but would work.
      this.setState({editting: true})
    },

    unEditRecipe: function(e) {
      if (this.props.recipe.id) {
        this.setState({editting: false})
      } else {
        this.props.hideModal()
      }
    },

    render: function() {
      var editButton
      if(this.props.recipe.user_id === window.USER_ID) {
        editButton = <button onClick={this.editRecipe}>Edit Recipe</button>
      }
      if (this.state.editting) {
        return (
          <div id="recipe-form">
            <RecipeForm recipe={this.props.recipe}
                        hideModal={this.props.hideModal}/>
            <button onClick={this.unEditRecipe}>Cancel</button>
          </div>
        )
      } else {
        return (
          <div id="recipe-detail">
            <RecipeShow recipe={this.props.recipe}/>
            {editButton}
          </div>
        )
      }
    }
  })

  root.RecipeShow = React.createClass({
    render: function () {
        return (
          <div>
            <h2>{this.props.recipe.title}</h2>
            <p>by {UserStore.find(this.props.recipe.user_id)}</p>
            <img src={this.props.recipe.photo}></img>
            <h4>{this.props.recipe.description}</h4>
            <h4>Ingredients</h4>
            <ul className="ingredients-list">
              {this.props.recipe.ingredients.map(function(ing){
                return <li key={ing.ord}>{ing.data}</li>
              })}
            </ul>
            <h4>Instructions</h4>
            <ul className="instructions-list">
              {this.props.recipe.instructions.map(function(inst){
                return <li key={inst.ord}>{inst.data}</li>
              })}
            </ul>
            <ul className="tag-list">
              {this.props.recipe.search_tags.map(function(tag){
                return <li key={tag.id}>{tag.data}</li>
              })}
            </ul>
          </div>
        )
    }
  });

  root.RecipeForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

    getInitialState: function() {
      return $.extend(true, {}, this.props.recipe);
    },

    handleSubmit: function(e) {
      // so, we need a family...
      e.preventDefault();
      if (FamilyStore.family().id !== undefined) {
        this.props.recipe.id ? APIUtil.editRecipe(this.state) : APIUtil.newRecipe(this.state)
        this.props.hideModal()
      } else {
        alert("You can't add recipes if you're not part of a family. I know, it sucks.")
        this.history.pushState(null, "/family")
      }
    },

    componentWillReceiveProps: function(newprops) {
      this.setState($.extend(true, {},newprops.recipe))
    },

    handlePic: function (e) {
      e.preventDefault()
      cloudinary.openUploadWidget(window.CLOUDINARY_OPTIONS,
        function (error, response) {
          if(error) {}//{alert("picture failed to upload")}
          //maybe add an errors store? or maybe just do nothing?
          //most of the time this pops up because I canceled the widget.
          else{
            this.setState({photo: response[0].url})
          }
        }.bind(this)
      );
    },

    changePersonal: function(e) {
      this.setState({personal: e.target.value})
    },

    render: function() {
      var pic;
      if (this.state.photo) {
        pic = (
          <div>
            <img className="thumbnail" src={this.state.photo}></img>
            <button onClick={this.handlePic}>Upload a Pic</button>
          </div>
        )
      }else{
        pic = <button onClick={this.handlePic}>Upload a Pic</button>
      }

      return (
       <form onSubmit={this.handleSubmit}>
         <div className="form-group">
           <label htmlFor="Title">Title</label>
           <input type="text" id="Title"
                  valueLink={this.linkState("title")}>
           </input>
         </div>
         <div className="form-group">
           <label htmlFor="Personal">Personal </label>
           <input type="radio" checked={this.state.personal} name="personal"
             value="true" id="Personal" onChange={this.changePersonal}></input>
           <br/>
           <label htmlFor="Shared"> Shared </label>
           <input type="radio" checked={!this.state.personal} name="personal"
             value="false" id="Shared" onChange={this.changePersonal}></input>
         </div>
         <div className="form-group">
           <label htmlFor="Description">Description</label>
           <input type="text" id="Description"
             valueLink={this.linkState("description")}>
           </input>
         </div>
         <div className="form-group">
           <label>Ingredients</label>
           <FormList object={this.state.ingredients}
                     buttonName="Add an ingredient"/>

         </div>
         <div className="form-group">
           <label>Instructions</label>
           <FormList object={this.state.instructions}
                     buttonName="Add an instruction"/>
         </div>
         <div className="form-group">
           {pic}
         </div>
         <div className="form-group">
           <label>Tags</label>
           <FormList object={this.state.search_tags}
                     buttonName="Add a Tag"/>
         </div>
         <div className="form-group">
           <input type="submit"></input>
         </div>
      </form>
      )
    }
  })

}(this));
