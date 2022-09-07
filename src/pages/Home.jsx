import { useState } from "react";
import logo from "../logo.svg";
import Form from "../components/forms/Form";
import Posts from "../components/posts/Posts";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createPostsFetch, updatePostsFetch } from "../actions/postAction";

function Home() {
  const [editMode, setEditMode] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  /*
    Desc: Function to handle create post

    Algorithm: 
      - preventing default behavior
      - dispatch/execute createPostsFetch action
      - update some state (message = 'Posted!', title = '', content = '')
      - update message state to empty in 500ms

    Param: event
    Return: -
  */
  const handleSubmitForm = (e) => {
    e.preventDefault();

    dispatch(
      createPostsFetch({
        // assume that this post is created by user with id 1
        userID: 1,
        title: title,
        body: content,
      })
    );

    setMessage("Posted!");
    setTitle("");
    setContent("");

    setTimeout(() => {
      setMessage("");
    }, 500);
  };

  /*
    Desc: Function to handle showing edited post information to the form

    Algorithm: 
      - update some state (editMode = selected id, title = selected title, content = selected content)

    Param: post
    Return: -
  */
  const handleShowEdit = (post) => {
    setEditMode(post.id);
    setTitle(post.title);
    setContent(post.body);
  };

  /*
    Desc: Function to handle edit post

    Algorithm: 
      - preventing default behavior
      - dispatch/execute updatePostsFetch action
      - update some state (message = 'Edited!', title = title, content = content)
      - update message state to empty in 500ms

    Param: event
    Return: -
  */
  const handleEditForm = (e) => {
    e.preventDefault();

    dispatch(
      updatePostsFetch({
        id: editMode,
        title: title,
        body: content,
      })
    );

    setMessage("Edited!");
    setTitle("");
    setContent("");

    setTimeout(() => {
      setMessage("");
    }, 500);
  };

  return (
    <section>
      <header className="flex items-center justify-center pb-4">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </header>

      <main className="flex md:flex-row flex-col items-center bg-white-transparent-0.7 backdrop-blur-md mx-auto rounded-xl w-full xs:w-9/12 py-2 min-h-[18rem]">
        <Form
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
          handleSubmitForm={handleSubmitForm}
          editMode={editMode}
          setEditMode={setEditMode}
          handleEditForm={handleEditForm}
          message={message}
        />
        <div className="min-h-full mx-8 border-l border-primary"></div>
        <Posts
          handleShowEdit={handleShowEdit}
          setEditMode={setEditMode}
          setTitle={setTitle}
          setContent={setContent}
        />
      </main>
    </section>
  );
}

export default Home;
