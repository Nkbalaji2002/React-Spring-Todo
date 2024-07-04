import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTodo, saveTodo, updateTodo } from "../services/TodoService";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("");
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setdescriptionError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const fetchTodo = async () => {
    if (id) {
      try {
        const resposne = await getTodo(id);
        setTitle(resposne.data.title);
        setDescription(resposne.data.description);
        setCompleted(resposne.data.completed);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const saveOrUpdateTodo = async (e) => {
    e.preventDefault();

    if (!title) {
      setTitleError("Title Cannot be Empty");
      return false;
    }

    if (!description) {
      setdescriptionError("Description Cannot be Empty");
      return false;
    }

    try {
      if (id) {
        await updateTodo(id, { title, description, completed });
      } else {
        await saveTodo({ title, description, completed });
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const pageTitle = () => (
    <h2 className="text-center">{id ? "Update Todo" : "Add Todo"}</h2>
  );

  return (
    <>
      <div className="container mb-3">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            {pageTitle()}
            <>
              <div className="card-body">
                <form>
                  <div className="form-group mb-2">
                    <label className="form-label">
                      Todo Title : <span className="text-danger">*</span>{" "}
                    </label>{" "}
                    {titleError && (
                      <span className="text-danger">{titleError}</span>
                    )}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Todo Title"
                      name="title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        setTitleError(null);
                      }}
                    />
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label">
                      Todo Description : <span className="text-danger">*</span>
                    </label>{" "}
                    {descriptionError && (
                      <span className="text-danger">{descriptionError}</span>
                    )}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Todo Description"
                      name="description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        setdescriptionError(null);
                      }}
                    />
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label">Todo Completed : </label>

                    <select
                      className="form-control"
                      value={completed}
                      onChange={(e) => setCompleted(e.target.value)}
                    >
                      <option value="false">NO</option>
                      <option value="true">YES</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={(e) => saveOrUpdateTodo(e)}
                  >
                    Submit
                  </button>

                  <button
                    className="btn btn-primary m-3"
                    onClick={() => navigate("/")}
                  >
                    Back to List
                  </button>
                </form>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
