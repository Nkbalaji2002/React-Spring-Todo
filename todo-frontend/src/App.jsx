import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListTodo from "./components/ListTodo";
import Todo from "./components/Todo";
import View from "./components/View";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" Component={ListTodo} />
          <Route path="/add-todo" Component={Todo} />
          <Route path="/update-todo/:id" Component={Todo} />
          <Route path="/view-todo/:id" Component={View} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
