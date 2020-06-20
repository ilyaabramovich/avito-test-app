import React from "react";
import styled from "styled-components";
import { REPOS_PER_PAGE, MAX_VISIBLE_PAGES } from "../constants";
import { Button } from "./Button";
import { StyledList } from "./StyledList";

const Pagination = styled(StyledList)`
  display: flex;
  justify-content: center;
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
    MAX_VISIBLE_PAGES,
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
