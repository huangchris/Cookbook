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
      return <div>This is my Splash page.  It tells you that this is a
        cookbook.  It also has links to <a href="#/family/recipes">
        the most important things.</a><br/>
      <ul className="list-inline">
        {this.state.photos.map(function(photo){
          return <li><img src={photo} className="recipe-pic"></img></li>
        })}
      </ul>
      </div>
    }
  })
}(this));
