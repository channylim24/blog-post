export const GET_POSTS_FETCH = "GET_POSTS_FETCH";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILED = "GET_POSTS_FAILED";
export const DELETE_POSTS_FETCH = "DELETE_POSTS_FETCH";
export const DELETE_POSTS_SUCCESS = "DELETE_POSTS_SUCCESS";
export const DELETE_POSTS_FAILED = "DELETE_POSTS_FAILED";
export const CREATE_POSTS_FETCH = "CREATE_POSTS_FETCH";
export const CREATE_POSTS_SUCCESS = "CREATE_POSTS_SUCCESS";
export const CREATE_POSTS_FAILED = "CREATE_POSTS_FAILED";
export const UPDATE_POSTS_FETCH = "UPDATE_POSTS_FETCH";
export const UPDATE_POSTS_SUCCESS = "UPDATE_POSTS_SUCCESS";
export const UPDATE_POSTS_FAILED = "UPDATE_POSTS_FAILED";

export const getPostsFetch = () => ({
  type: GET_POSTS_FETCH,
});

export const deletePostsFetch = (id) => ({
  type: DELETE_POSTS_FETCH,
  payload: id,
});

export const createPostsFetch = (data) => ({
  type: CREATE_POSTS_FETCH,
  payload: data,
});

export const updatePostsFetch = (data) => ({
  type: UPDATE_POSTS_FETCH,
  payload: data,
});
