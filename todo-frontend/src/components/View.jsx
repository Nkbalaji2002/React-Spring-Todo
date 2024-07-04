import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTodo } from "../services/TodoService";

const View = () => {
  const [todo, setTodo] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const fetchTodo = async () => {
    try {
      let response = await getTodo(id);
      setTodo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center">View Todo</h2>

        <div className="card col-md-6 offset-md-3">
          <div className="card-body">
            <div className="card-header">
              <h3>{todo.title}</h3>
            </div>

            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3">Description :</div>
                <div className="col-sm-9">{todo.description}</div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-3">Completed : </label>
                <div className="col-sm-9">{todo.completed ? "YES" : "NO"}</div>
              </div>

              <div className="card-footer">
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => navigate("/")}
                >
                  Back to List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
