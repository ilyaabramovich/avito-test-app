import React from "react";
import styled from "styled-components";
import { REPOS_PER_PAGE } from "../constants";
import { Button } from "./Button";

const Pagination = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  justify-content: center;
  border-radius: 0.25rem;
`;

const PaginatorButton = styled(Button)`
  position: relative;
  line-height: 1.25;
  margin-left: -1px;
  border-radius: 0;

  &.active {
    z-index: 1;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

  &:focus {
    z-index: 2;
  }
`;

export default function Paginator({ onPageClick, page, total }) {
  const pageNumbers = [];
  const lastPageNumber = Math.min(
    REPOS_PER_PAGE,
    Math.ceil(total / REPOS_PER_PAGE)
  );

  for (let i = 1; i <= lastPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <Pagination>
        {pageNumbers.map((number) => (
          <li key={number}>
            <PaginatorButton
              className={page === number ? "active" : ""}
              onClick={() => onPageClick(number)}
            >
              {number}
            </PaginatorButton>
          </li>
        ))}
      </Pagination>
    </nav>
  );
}
