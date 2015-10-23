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
        the most important things.</a><br/>Important note on managing families:
        Kicking people from the group is possible, but mean and you should
        not do it. (Also things might break)<br/>
        If you're confused why a recipe doesn't show up when you search for
        a term you think should apply to it, try adding a tag to the recipe.<br/>
        If you aren't in a family and want to join one, that list of
        families is clickable.<br/>
        If someone wants to join your family, but you don't like them, for now
        you have to add them to the group before you kick them out.<br/>
      Wait a few seconds before commenting on your families wall, because... reasons. <br/>
      {this.state.photos.map(function(photo){
        return <img src={photo} className="recipe-pic"></img>
      })}
      </div>
    }
  })
}(this));
