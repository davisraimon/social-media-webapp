import { GET_POSTS, POST_ERROR } from "../actions/types";
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload, loading: false };
    case POST_ERROR:
      return { ...state, error: payload, loadaing: false };
    default:
      return { ...state };
  }
}
