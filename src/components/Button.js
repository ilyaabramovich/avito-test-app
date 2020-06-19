import styled from "styled-components";

export const Button = styled.button`
  display: block;
  padding: 0.375rem 0.75rem;
  color: #007bff;
  font-size: 1rem;
  border: 1px solid #dee2e6;
  background-color: white;
  line-height: 1.5;
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover {
    color: #0056b3;
    background-color: #e9ecef;
    border-color: #dee2e6;
  }

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;
