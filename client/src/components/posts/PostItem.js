import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import { addLike, removeLike } from "../../actions/post";
import { deletePost } from "../../actions/post";

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  addLike,
  removeLike,
  deletePost,
}) => {
  const [likeState, setLikeState] = useState("");
  const callLikeActions = () => {
    if (likeState === "post-like-button-clicked") {
      removeLike(_id);
      setLikeState("");
    } else {
      addLike(_id);
      setLikeState("post-like-button-clicked");
    }
  };
  const setLikeButtonColor = () => {
    const likecheck = (like) => auth.user._id === like.user;
    if (likes.some(likecheck)) {
      setLikeState("post-like-button-clicked");
    } else {
      setLikeState("");
    }
  };
  //change color if liked
  useEffect(() => {
    if (auth.user !== null) {
      setLikeButtonColor();
    }
  }, []);
  return (
    <>
      <Card className="post p-1 my-1">
        <div>
          <Link to="/profile">
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              callLikeActions();
            }}
          >
            <i className={`fas fa-thumbs-up ${likeState}`}></i>
          </button>
          <Link
            to={`/post/${_id}`}
            className="btn btn-primary align-center"
            style={{ width: 160 }}
          >
            Discussion{" "}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deletePost(_id)}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
          <p className="post-likes">
            <span>
              {likes.length > 0 ? likes.length : ""}
              {likes.length > 0 ? " Likes" : ""}{" "}
            </span>
          </p>
        </div>
      </Card>
    </>
  );
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
