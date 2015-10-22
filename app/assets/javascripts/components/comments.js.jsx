(function(root) {
  'use strict';
  root.Comments = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
      return {commentCount: 5, comment: ""};
    },

    componentWillMount: function () {
      APIUtil.getComments(this.props.recipeID);
    },

    storeListener: function () {
      this.forceUpdate();
    },

    componentDidMount: function () {
      CommentStore.on(StoreConst.COMMENTS, this.storeListener);
    },
    componentWillUnmount: function () {
      CommentStore.removeListener(StoreConst.COMMENTS, this.storeListener);
    },

    addComments: function(e) {
      e.preventDefault();
      APIUtil.getComments(this.props.recipeID);
      this.setState({commentCount: this.state.commentCount + 5});
    },

    createComment: function(e) {
      e.preventDefault();
      APIUtil.createComment(this.state.comment, this.props.recipeID);
      this.setState({comment: ""});
    },

    render: function () {
      return (
        <ul>
          {CommentStore.show(this.state.commentCount).map(function(comment) {
            var user = UserStore.find(comment.user_id);
            return (
              <li>
                <img className="profile-pic"
                      src={user.image}>
                </img>
                <div>{user.name}</div>
                <div>{comment.body}</div>
              </li>
            );
          })}
          <li><form onSubmit={this.createComment}>
            <input type="text" valueLink={this.linkState("comment")}></input>
            <input type="submit" value="Add a comment"></input>
            </form></li>
          <li><a href="#" onClick={this.addComments}>Show More Comments</a></li>
        </ul>
      );
    }
  })
}(this));
