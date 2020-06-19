import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledLink } from "./StyledLink";

const RepoList = styled.ul`
  margin-bottom: 1rem;
  padding: 0;
  list-style: none;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;

const RepoListItem = styled.li`
  padding: 0.5rem;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 0.5rem;
  border-bottom: 1px solid #ced4da;

  @media (max-width: 599px) {
    grid-template-columns: 3fr 1fr;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const GithubLogo = styled.svg`
  display: block;
  margin: 0 auto;
`;

const LastCommit = styled.span`
  @media (max-width: 599px) {
    font-size: 0.75rem;
  }
`;

const GithubLink = styled.a`
  @media (max-width: 599px) {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 4;
  }

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const GithubStars = styled.span`
  @media (max-width: 599px) {
    font-size: 0.75rem;
  }
`;

const RepoNameLink = styled(StyledLink)`
  @media (max-width: 599px) {
    padding: 0.25rem 0;
  }
`;

export default function RepositoriesList({ loading, repos }) {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <RepoList>
      {repos.map(({ name, id, stars, lastCommit, url }) => (
        <RepoListItem key={id}>
          <RepoNameLink as={Link} to={`/${id}`}>
            {name}
          </RepoNameLink>
          <GithubStars role="img" aria-label="Github stars">
            ⭐{stars}
          </GithubStars>
          <LastCommit>
            Last commit: {new Date(lastCommit).toLocaleString()}
          </LastCommit>
          <GithubLink href={url} aria-label="Github link">
            <GithubLogo
              height="32"
              viewBox="0 0 16 16"
              version="1.1"
              width="32"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </GithubLogo>
          </GithubLink>
        </RepoListItem>
      ))}
    </RepoList>
  );
}
