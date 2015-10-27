// ENTHUSIASM UNKNOWN TO MANKIND

(function(root) {
  'use strict';
  root.RecipeModal = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      return {editting: this.props.editting};
    },

    componentWillMount: function () {
      if(UserStore.isPending()) {
        alert("You can't view or add Recipes until you are an approved member of a family");
        this.history.pushState(null, "/family");
      }
      $(document.body).on("keydown", this.escape)
    },

    // Probably don't need this:
    componentWillReceiveProps: function(newProps) {
      this.setState({editting: newProps.editting});
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
    componentWillUnmount: function () {
      $(document.body).off("keydown", this.escape);
    },

    editRecipe: function (e) {
      //maybe make the form and this visible/invisible, and put this back into the main?
      //or just put the button on the main?  that would be weird, but would work.
      this.setState({editting: true});
    },

    unEditRecipe: function(e) {
      if (this.props.recipe.id) {
        this.setState({editting: false});
      } else {
        this.props.hideModal();
      }
    },

    escape: function (e) {
      if(e.keyCode === 27) {
        e.preventDefault();
        this.props.hideModal();
      }
    },

    render: function() {
      var editButton;
      if(this.props.recipe.user_id === window.USER_ID) {
        editButton = <button onClick={this.editRecipe}>Edit Recipe</button>
      }
      if (this.state.editting) {
        return (
          <div id="recipe-form" className= "modal-show">
            <RecipeForm recipe={this.props.recipe}
                        hideModal={this.props.hideModal}
                        request={this.props.request}/>
            <button onClick={this.unEditRecipe}>Cancel</button>
          </div>
        )
      } else {
        return (
          <div className= "modal-show" id="recipe-detail">
            <RecipeShow recipe={this.props.recipe}
                hideModal={this.props.hideModal}/>
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
             <span onClick={this.props.hideModal}
               className="glyphicon glyphicon-remove"
               aria-hidden="true"></span>
             <h1>{this.props.recipe.title}</h1>
            <p>by {UserStore.find(this.props.recipe.user_id).name}</p>
            <img className="recipe-pic" src={this.props.recipe.photo}></img>
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
                return <li className="inst-list-item" key={inst.ord}>{inst.data}</li>
              })}
            </ul>
            <ul className="tag-list">
              {this.props.recipe.search_tags.map(function(tag){
                return <li key={tag.id}>{tag.data}</li>
              })}
            </ul>
            <div>Comments</div>
            <Comments parentType="Recipe" ID={this.props.recipe.id}/>
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
      e.preventDefault();
      if (FamilyStore.family().id !== undefined) {
        if(this.props.recipe.id){
          APIUtil.editRecipe(this.state)
        } else{
          APIUtil.newRecipe(this.state, this.props.request)
        }
        this.props.hideModal();
      } else {
        alert("You can't add recipes if you're not part of a family. I know, it sucks.");
        this.history.pushState(null, "/family");
      }
    },

    componentWillReceiveProps: function(newprops) {
      this.setState($.extend(true, {},newprops.recipe));
    },

    handlePic: function (e) {
      e.preventDefault();
      if(this.open){return;}
      this.open = true;
      cloudinary.openUploadWidget(window.CLOUDINARY_OPTIONS,
        function (error, response) {
          if(error) {}//{alert("picture failed to upload")}
          //maybe add an errors store? or maybe just do nothing?
          //most of the time this pops up because I canceled the widget.
          else{
            this.setState({photo: response[0].url});
          }
          this.open = false;
        }.bind(this)
      );
    },

    changeTabTag:function(e) {
      this.setState({tab_tag_id: e.target.value});
    },

    changePersonal: function(e) {
      this.setState({personal: e.target.value});
    },

    deleteRecipe: function(e) {
      e.preventDefault();
      if (confirm("Are you sure you want to delete this recipe?")) {
        APIUtil.deleteRecipe(this.state.id)
        this.props.hideModal()
      }
    },

    render: function() {
      var pic;
      var remove;

      if (this.state.photo) {
        pic = (
          <div>
            <img className="thumbnail mine" src={this.state.photo}></img>
            <button onClick={this.handlePic}>Upload a Pic</button>
          </div>
        )
      }else{
        pic = <button className="form-control" onClick={this.handlePic}>Upload a Pic</button>
      }

      if (this.state.id) {
        remove = <input type="submit"
                        className="form-control"
                        onClick={this.deleteRecipe} value="Delete Recipe"></input>
      }

      return (
       <form className="form-horizontal mine" onSubmit={this.handleSubmit}>
         <span onClick={this.props.hideModal}
           className="glyphicon glyphicon-remove"
           aria-hidden="true"></span>
         <div className="form-group">
           <label htmlFor="Title">Title</label>
           <input className="form-control" type="text" id="Title"
                  valueLink={this.linkState("title")}>
           </input>
         </div>
         <div className="form-group">
             <label htmlFor="Personal">Personal </label>
             <span> </span>
             <input type="radio" checked={this.state.personal} name="personal"
               value="true" id="Personal" onChange={this.changePersonal}></input>
             <br/>
             <label htmlFor="Shared"> Shared </label>
             <span> </span>
             <input type="radio" checked={!this.state.personal} name="personal"
               value="false" id="Shared" onChange={this.changePersonal}></input>
         </div>
         <div className="form-group">
           <label htmlFor="Description">Description</label>
           <input className="col-xs-12 form-control" type="text" id="Description"
             valueLink={this.linkState("description")}></input>
         </div>
         <div className="form-group">
           <label className="col-xs-2" >Ingredients</label>
         </div>
         <div className="form-group">
           <div  className="col-xs-12">
             <FormList object={this.state.ingredients}
                       buttonName="Add an ingredient"/>
           </div>

         </div>
         <div className="form-group">
           <label className="col-xs-2" >Instructions</label>
         </div>
         <div className="form-group">
           <div  className="col-xs-12">
             <FormList object={this.state.instructions}
                     buttonName="Add an instruction"/>
           </div>
         </div>
         <div className="form-group">
           <div  className="col-xs-10">
             {pic}
           </div>
         </div>
         <div className="form-group">
           <label className="col-xs-2" htmlFor="tab-tag">Category </label>
           <select className="col-xs-4" id="tab-tag"
                  onChange={this.changeTabTag}>
             {TagStore.all().map(function(tag){
               return <option selected={this.state.tab_tag_id===tag.id}
                   value={tag.id}>{tag.data}</option>
               }.bind(this))}
           </select>
         </div>
         <div className="form-group">
           <label className="col-xs-2" >Tags</label>
         </div>
         <div className="form-group">
           <div  className="col-xs-4">
             <FormList object={this.state.search_tags}
                     buttonName="Add a Tag"/>
           </div>
         </div>
         <div className="form-group">
           <div className="col-xs-2" ></div>
           {remove}
         </div>
         <div className="form-group">
           <div className="col-xs-2" ></div>
           <input className="col-xs-2 form-control"
             type="submit" value="Save"></input>
         </div>
      </form>
      )
    }
  })

}(this));
