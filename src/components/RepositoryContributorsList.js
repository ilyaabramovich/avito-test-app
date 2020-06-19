import React from "react";
import styled from "styled-components";
import { GithubAvatar } from "./GithubAvatar";
import { StyledLink } from "./StyledLink";

const ContributorsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ContributorsListItem = styled.li`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

export function RepositoryContributorsList({ contributors }) {
  return (
    <ContributorsList>
      {contributors.map(({ id, name, url, avatar }) => (
        <ContributorsListItem key={id}>
          <GithubAvatar src={avatar} alt={name} />
          <StyledLink key="contributor" href={url}>
            {name}
          </StyledLink>
        </ContributorsListItem>
      ))}
    </ContributorsList>
  );
}
