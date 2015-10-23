(function(root) {
  'use strict';
  root.Comments = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
      return {commentCount: 5, comment: ""};
    },

    componentWillMount: function () {
      APIUtil.getComments(this.props.ID, this.props.parentType);
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
      APIUtil.getComments(this.props.ID, this.props.parentType);
      this.setState({commentCount: this.state.commentCount + 5});
    },

    createComment: function(e) {
      e.preventDefault();
      APIUtil.createComment(this.state.comment, this.props.ID, this.props.parentType);
      this.setState({comment: "", commentCount: 5});
    },

    render: function () {
      return (
        <ul className="col-xs-12 list-group">
          <li key="CommentShow"><a href="#" onClick={this.addComments}>Show Older Comments</a></li>
          {CommentStore.show(this.state.commentCount).map(function(comment) {
            var user = UserStore.find(comment.user_id);
            return (
              <li className="list-group-item"
                key={"comment" + comment.id}>
                <img className="profile-pic"
                      src={user.image || "/assets/user_icon.png"}>
                </img>
                <strong>{user.name}</strong>
                <div>{comment.body}</div>
              </li>
            );
          })}
          <li key="CommentAdd"><form onSubmit={this.createComment}>
            <input type="text" valueLink={this.linkState("comment")}></input>
            <input type="submit" value="Add a comment"></input>
            </form></li>
        </ul>
      );
    }
  })
}(this));
