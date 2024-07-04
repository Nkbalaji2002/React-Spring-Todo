import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ todosPerPage, totalTodos, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li className="page-item text-center" key={number}>
              <Link onClick={() => paginate(number)} className="page-link">
                {number}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
