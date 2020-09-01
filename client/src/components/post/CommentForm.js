import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment, removeComment } from "../../actions/post";

const CommentForm = ({ addComment, post_id }) => {
  const [text, setText] = useState("");
  return (
    <>
      <div class="post-form">
        <div class="bg-primary p border-radius">
          <h4>Leave a comment...</h4>
        </div>
        <form
          class="form my-1"
          onSubmit={(e) => {
            e.preventDefault();
            addComment(post_id, { text });
            setText("");
          }}
        >
          <textarea
            className="border-radius"
            name="text"
            cols="30"
            rows="5"
            placeholder="Make a comment"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </>
  );
};

CommentForm.propTypes = {
  removeComment: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment, removeComment })(CommentForm);
