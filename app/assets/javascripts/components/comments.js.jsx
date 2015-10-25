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
      var addMore;
      if(this.state.commentCount < CommentStore.count()) {
        addMore = <li key="CommentShow"><a href="#"
            onClick={this.addComments}>Show Older Comments</a></li>
      }
      return (
        <ul className="col-xs-12 list-group">
          {addMore}
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
            <div className="form-group">
              <textarea className="col-xs-10 col-xs-offset-1" type="text" valueLink={this.linkState("comment")}></textarea>
            </div>
            <div className="form-group">
              <input className="col-xs-4 col-xs-offset-7" type="submit" value="Add a comment"></input>
            </div>
          </form></li>
        </ul>
      );
    }
  })
}(this));
