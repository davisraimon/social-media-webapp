import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { removeComment } from "../../actions/post";

const CommentItem = ({
  post_id,
  auth,
  comment: { _id, text, name, avatar, user, date },
  removeComment,
}) => {
  return (
    <>
      <div className="post bg-white p-1 my border-radius ">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name && name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          {user === auth.user._id && !auth.loading && (
            <>
              <button
                onClick={(e) => removeComment(post_id, _id)}
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post_id: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps, { removeComment })(CommentItem);
