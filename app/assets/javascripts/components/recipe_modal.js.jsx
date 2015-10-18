// ENTHUSIASM UNKNOWN TO MANKIND

(function(root) {
  'use strict';
  root.RecipeModal = React.createClass({
    getInitialState: function () {
      return {editting: this.props.editting}
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
      debugger;
      if (this.props.recipe.id) {
        this.setState({editting: false})
      } else {
        this.props.hideModal()
      }
    },

    render: function() {
      if (this.state.editting) {
        return (
          <div id="recipe-form">
            <RecipeForm recipe={this.props.recipe}/>
            <button onClick={this.unEditRecipe}>Cancel</button>
          </div>
        )
      } else {
        return (
          <div id="recipe-detail">
            <RecipeShow recipe={this.props.recipe}/>
            <button onClick={this.editRecipe}>Edit Recipe</button>
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
            <img src={this.props.recipe.photo}></img>
            <h4>{this.props.recipe.description}</h4>
            <p>{this.props.recipe.ingredients}</p>
            <p>{this.props.recipe.instructions}</p>
          </div>
        )
    }
  });

  root.RecipeForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {
      return $.extend({},this.props.recipe) // store the form inputs here.
      // return {title: "title", description: "stuff", ingredients: "stuff", instructions: "stuff"}
    },

    handleSubmit: function(e) {
      e.preventDefault();
      this.props.recipe.id ? APIUtil.editRecipe(this.state) : APIUtil.newRecipe(this.state)
      $("#modal").removeClass("active-modal").addClass("hidden-modal")
    },

    componentWillReceiveProps: function(newprops) {
      this.setState($.extend({},newprops.recipe))
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
           <label htmlFor="Description">Description</label>
           <input type="text" id="Description"
             valueLink={this.linkState("description")}>
           </input>
         </div>
         <div className="form-group">
           <label htmlFor="Ingredients">Ingredients</label>
           <textarea id="Ingredients"
             valueLink={this.linkState("ingredients")}>
           </textarea>
         </div>
         <div className="form-group">
           <label htmlFor="Instructions">Instructions</label>
           <textarea type="text" id="Instructions"
             valueLink={this.linkState("instructions")}>
           </textarea>
         </div>
         <div className="form-group">
           {pic}
         </div>
         <div className="form-group">
           <input type="submit"></input>
         </div>
      </form>
      )
    }
  })

}(this));
