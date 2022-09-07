import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsFetch, deletePostsFetch } from "../../actions/postAction";
import Post from "./Post";
import Loading from "../loading/Loading";

function Posts(props) {
  const { handleShowEdit, setEditMode, setTitle, setContent } = props;
  const dispatch = useDispatch();
  const postsStore = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getPostsFetch());
  }, []);

  /*
    Desc: Function to handle delete post

    Algorithm: 
      - dispatch/execute deletePostsFetch action

    Param: id
    Return: -
  */
  const handleDelete = (id) => {
    dispatch(deletePostsFetch(id));
  };

  return (
    <div className="flex-1 px-4 md:pl-0 md:pr-5 py-5 w-full md:w-1/2 space-y-2">
      <h1 className="text-3xl">My Posts List</h1>
      <ul className="space-y-2 h-72 overflow-x-visible overflow-y-scroll">
        {postsStore.isLoading && <Loading />}
        {postsStore.posts.map((post) => (
          <Post
            post={post}
            key={post.id}
            handleDelete={handleDelete}
            handleShowEdit={handleShowEdit}
            setEditMode={setEditMode}
            setTitle={setTitle}
            setContent={setContent}
          />
        ))}
      </ul>
    </div>
  );
}

export default Posts;
