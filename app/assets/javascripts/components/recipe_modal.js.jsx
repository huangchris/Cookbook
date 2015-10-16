(function(root) {
  'use strict';
  root.RecipeModal = React.createClass({
    hideModal: function(e){
      if (e.target === e.currentTarget){
        $("#modal").removeClass("active-modal").addClass("hidden-modal")
      }
    },
    render: function() {
      var button;
      if(UserStore.currentUser().id === this.props.recipe.user_id ||
        this.props.recipe.personal === false){
          button = <button>Edit this Recipe</button>
        }
      return (
        <section id="modal"
          className="hidden-modal"
          onClick={this.hideModal}>
          <div>
            <h2>{this.props.recipe.title}</h2>
            <img src={this.props.recipe.photo}></img>
            <h4>{this.props.recipe.description}</h4>
            <p>{this.props.recipe.ingredients}</p>
            <p>{this.props.recipe.instructions}</p>
            {button}
          </div>
        </section>
      )
    }
  })
}(this));
