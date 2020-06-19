import styled from "styled-components";

export const SearchInput = styled.input`
  display: block;
  margin-right: 1rem;
  width: 100%;
  height: 2.375rem;
  padding: 0.375rem 0.75rem;
  color: #495057;
  background-color: white;
  background-clip: padding-box;
  border: 1px solid lightgray;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;
