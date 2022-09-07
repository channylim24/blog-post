import {
  GET_POSTS_SUCCESS,
  DELETE_POSTS_SUCCESS,
  CREATE_POSTS_SUCCESS,
  UPDATE_POSTS_SUCCESS,
  GET_POSTS_FETCH,
  DELETE_POSTS_FETCH,
  CREATE_POSTS_FETCH,
  UPDATE_POSTS_FETCH,
  GET_POSTS_FAILED,
  DELETE_POSTS_FAILED,
  CREATE_POSTS_FAILED,
  UPDATE_POSTS_FAILED,
} from "../actions/postAction";

const initialState = {
  posts: [],
  isLoading: false,
};

const getPostReducer = (state = initialState, action) => {
  const { type, payload, err } = action;
  switch (type) {
    case GET_POSTS_FETCH:
    case DELETE_POSTS_FETCH:
    case CREATE_POSTS_FETCH:
    case UPDATE_POSTS_FETCH:
      return { ...state, isLoading: true };
    case GET_POSTS_SUCCESS:
      return { ...state, posts: payload, isLoading: false };
    case DELETE_POSTS_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== payload),
        isLoading: false,
      };
    case CREATE_POSTS_SUCCESS:
      const ids = state.posts.map((post) => {
        return post.id;
      });

      const max = Math.max(...ids);

      return {
        ...state,
        posts: [{ ...payload, id: max + 1 }, ...state.posts],
        isLoading: false,
      };
    case UPDATE_POSTS_SUCCESS:
      const updatedPostIndex = state.posts.findIndex(
        (post) => post.id === payload.id
      );

      return {
        ...state,
        posts: [
          ...state.posts.slice(0, updatedPostIndex),
          {
            ...state.posts[updatedPostIndex],
            title: payload.title,
            body: payload.body,
          },
          ...state.posts.slice(updatedPostIndex + 1),
        ],
        isLoading: false,
      };
    case GET_POSTS_FAILED:
    case DELETE_POSTS_FAILED:
    case CREATE_POSTS_FAILED:
    case UPDATE_POSTS_FAILED:
      return { ...state, isLoading: false, err };
    default:
      return state;
  }
};

export default getPostReducer;
