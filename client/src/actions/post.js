import axios from "axios";
import { setAlert } from "./alert";
import {
  POST_ERROR,
  GET_POSTS,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
} from "./types";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//add a like
export const addLike = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${post_id}`);
    dispatch({ type: UPDATE_LIKES, payload: { id: post_id, likes: res.data } });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//remove a like
export const removeLike = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${post_id}`);
    dispatch({ type: UPDATE_LIKES, payload: { id: post_id, likes: res.data } });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);
    dispatch({ type: DELETE_POST, payload: id });
    dispatch(setAlert("Post removed succesfully", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(formData, config);
    const res = await axios.post("/api/posts/", formData, config);
    dispatch({ type: ADD_POST, payload: res.data });
    dispatch(setAlert("Content posted!", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
