import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  compteteTodo,
  deleteTodo,
  getAllTodos,
  incompteteTodo,
} from "../services/TodoService";
import Pagination from "./Pagination";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    listTodos();
  }, []);

  const listTodos = async () => {
    try {
      const resposne = await getAllTodos();
      setTodos(resposne.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewTodo = () => navigate("/add-todo");

  const viewTodo = (id) => navigate(`/view-todo/${id}`);

  const updateTodo = (id) => navigate(`/update-todo/${id}`);

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      listTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const markCompleteTodo = async (id) => {
    try {
      await compteteTodo(id);
      listTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const markInCompleteTodo = async (id) => {
    try {
      await incompteteTodo(id);
      listTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const truncateDescription = (description) =>
    description.length > 30
      ? description.substring(0, 30) + "....."
      : description;

  // Pagination Logic
  const indexofLastTodo = currentPage * todosPerPage;

  const indexofFirstTodo = indexofLastTodo - todosPerPage;

  const currentTodos = todos.slice(indexofFirstTodo, indexofLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container">
        <h2 className="text-center">List of Todos</h2>

        <button className="btn btn-primary mb-2" onClick={() => addNewTodo()}>
          Add Todo
        </button>

        <>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Completed</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentTodos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.title}</td>
                  <td>{truncateDescription(todo.description)}</td>
                  <td>{todo.completed ? "YES" : "NO"}</td>

                  <td>
                    <button
                      onClick={() => updateTodo(todo.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-danger"
                      onClick={() => removeTodo(todo.id)}
                    >
                      Delete
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-success"
                      onClick={() => markCompleteTodo(todo.id)}
                    >
                      Complete
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-info"
                      onClick={() => markInCompleteTodo(todo.id)}
                    >
                      In Complete
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-info"
                      onClick={() => viewTodo(todo.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            todosPerPage={todosPerPage}
            totalTodos={todos.length}
            paginate={paginate}
          />
        </>
      </div>
    </>
  );
};

export default ListTodo;
