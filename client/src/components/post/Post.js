import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem"
import { Link } from "react-router-dom";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/posts" className="btn btn-light">
        <i className="fa fa-arrow-left" aria-hidden="true"></i> Back to posts
      </Link>
      <PostItem showActions={false} post={post}></PostItem>
      <CommentForm post_id={post._id}></CommentForm>
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            post_id={post._id}
          ></CommentItem>
        ))}
      </div>
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost })(Post);
