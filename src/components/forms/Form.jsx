import React from "react";

function Form(props) {
  const {
    message,
    title,
    setTitle,
    content,
    setContent,
    handleSubmitForm,
    editMode,
    setEditMode,
    handleEditForm,
  } = props;

  return (
    <form className="space-y-4 md:pl-5 md:pr-0 py-5 flex-1 px-4 w-full md:w-1/2">
      <div className="flex flex-col">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          className="input-field"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="content">Content:</label>
        <textarea
          type="text"
          name="content"
          id="content"
          className="input-field max-h-40 h-40 resize-none"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
      </div>
      <button
        onClick={
          editMode
            ? (e) => {
                handleEditForm(e);
                setEditMode(null);
              }
            : (e) => handleSubmitForm(e)
        }
        className="bg-primary form-button"
      >
        {message ? message : editMode ? "Edit It!" : "Post It!"}
      </button>
      {editMode ? (
        <button
          onClick={() => {
            setEditMode(null);
            setTitle("");
            setContent("");
          }}
          type="button"
          className="bg-red-500 form-button"
        >
          Cancel Editing
        </button>
      ) : (
        <></>
      )}
    </form>
  );
}

export default Form;
