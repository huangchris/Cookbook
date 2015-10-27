(function(root) {
  'use strict';
  root.Welcome = React.createClass({
    getInitialState: function (){
      return {photos: []};
    },

    componentDidMount: function () {
      APIUtil.samplePictures();
      PictureStore.on(StoreConst.PICTURES, this.storeListener);
    },

    componentWillUnmount: function () {
      PictureStore.removeListener(StoreConst.PICTURES, this.storeListener);
    },

    storeListener: function () {
      this.setState({photos: PictureStore.all()})
    },

    render: function () {
      return <div><div className="jumbotron"><h2>Welcome to Cookbooks!
        Store your recipes and share them with your family.</h2>
      <h3>Contribute to your family's book of favorite recipes
      <a href="#/recipes"> here</a><br/> or save your own recipes
      <a href="#/family"> here</a><br/></h3></div>
      <ul className="row pictures">
        {this.state.photos.map(function(photo){
          return <li className="col-xs-4 pictures"><img src={photo} className="recipe-pic"></img></li>
        })}
      </ul>
      </div>
    }
  })
}(this));
