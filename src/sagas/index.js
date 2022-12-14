import {
  fork,
  all,
  call,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  GET_POSTS_FETCH,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILED,
  DELETE_POSTS_FETCH,
  DELETE_POSTS_SUCCESS,
  DELETE_POSTS_FAILED,
  CREATE_POSTS_FETCH,
  CREATE_POSTS_SUCCESS,
  CREATE_POSTS_FAILED,
  UPDATE_POSTS_FETCH,
  UPDATE_POSTS_SUCCESS,
  UPDATE_POSTS_FAILED,
} from "../actions/postAction";
import axios from "axios";

let api = "https://jsonplaceholder.typicode.com/posts";

// API Calling
const postsFetch = async () => {
  return await axios.get(api);
};

const postsDelete = async (id) => {
  return await axios.delete(`${api}/${id}`);
};

const postsCreate = async (data) => {
  return await axios.post(api, data);
};

const postsUpdate = async (data) => {
  const { id, ...rest } = data;

  return await axios.patch(`${api}/${data.id}`, rest);
};

// Workers
/*
    Desc: Function to fetch post

    Algorithm: 
      - wrap code with try catch
      - call postsFetch function for calling the get posts API
      - check if response status 200 
      - then send the response data to reducer that listening to GET_POSTS_SUCCESS
      - if catch any error, send the error to reducer that listening to GET_POSTS_FAILED

    Param: -
    Return: -
*/
function* workGetPostsFetch() {
  try {
    const response = yield call(postsFetch);

    if (response.status === 200) {
      yield put({ type: GET_POSTS_SUCCESS, payload: response.data });
    }
  } catch (err) {
    yield put({ type: GET_POSTS_FAILED, err });
  }
}

/*
    Desc: Function to delete post

    Algorithm: 
      - wrap code with try catch
      - call postsDelete function for calling the delete post API
      - check if response status 200 
      - then send the response data/payload* to reducer that listening to DELETE_POSTS_SUCCESS
      - if catch any error, send the error to reducer that listening to DELETE_POSTS_FAILED
      *I use payload because the jsonplaceholder not returning id back in the response

    Param: action
    Return: -
*/
function* workDeletePostsFetch(action) {
  try {
    const { payload } = action;
    const response = yield call(postsDelete, payload);

    if (response.status === 200) {
      yield put({ type: DELETE_POSTS_SUCCESS, payload: payload });
    }
  } catch (err) {
    yield put({ type: DELETE_POSTS_FAILED, err });
  }
}

/*
    Desc: Function to create post

    Algorithm: 
      - wrap code with try catch
      - call postsCreate function for calling the create post API
      - check if response status 201 
      - then send the response data to reducer that listening to CREATE_POSTS_SUCCESS
      - if catch any error, send the error to reducer that listening to CREATE_POSTS_FAILED

    Param: action
    Return: -
*/
function* workCreatePostsFetch(action) {
  try {
    const { payload } = action;
    const response = yield call(postsCreate, payload);

    if (response.status === 201) {
      yield put({ type: CREATE_POSTS_SUCCESS, payload: response.data });
    }
  } catch (err) {
    yield put({ type: CREATE_POSTS_FAILED, err });
  }
}

/*
    Desc: Function to update post

    Algorithm: 
      - wrap code with try catch
      - call postsUpdate function for calling the update post API
      - check if there is no id return from the response*, fill it with payload id
      - check if response status 200
      - then send the response data to reducer that listening to UPDATE_POSTS_SUCCESS
      - if catch any error, send the error to reducer that listening to UPDATE_POSTS_FAILED
      *if we are trying to update data with id that is not listed in jsonplaceholder database,
      the API will send a response back without id, that's why I use the payload id.
      Data with id that is not listed in jsonplaceholder db is data that I just created with 
      id generated by front end

    Param: action
    Return: -
*/
function* workUpdatePostsFetch(action) {
  try {
    const { payload } = action;
    const response = yield call(postsUpdate, payload);

    if (!response.data.id) {
      response.data.id = payload.id;
    }

    if (response.status === 200) {
      yield put({ type: UPDATE_POSTS_SUCCESS, payload: response.data });
    }
  } catch (err) {
    yield put({ type: UPDATE_POSTS_FAILED, err });
  }
}

// Watchers
function* getPostsSaga() {
  yield takeEvery(GET_POSTS_FETCH, workGetPostsFetch);
}

function* deletePostsSaga() {
  yield takeEvery(DELETE_POSTS_FETCH, workDeletePostsFetch);
}

function* createPostsSaga() {
  yield takeLatest(CREATE_POSTS_FETCH, workCreatePostsFetch);
}

function* updatePostsSaga() {
  yield takeLatest(UPDATE_POSTS_FETCH, workUpdatePostsFetch);
}

// Root Saga
const sagas = [
  fork(getPostsSaga),
  fork(deletePostsSaga),
  fork(createPostsSaga),
  fork(updatePostsSaga),
];

function* rootSaga() {
  yield all([...sagas]);
}

export default rootSaga;
