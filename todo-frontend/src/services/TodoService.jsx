import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/todos";

export const getAllTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const saveTodo = async (todo) => {
  try {
    const response = await axios.post(API_URL, todo);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getTodo = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateTodo = async (id, todo) => {
  try {
    let response = await axios.put(`${API_URL}/${id}`, todo);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (id) => {
  try {
    let response = await axios.delete(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const compteteTodo = async (id) => {
  try {
    let response = await axios.patch(`${API_URL}/${id}/complete`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const incompteteTodo = async (id) => {
  try {
    let response = await axios.patch(`${API_URL}/${id}/in-complete`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
