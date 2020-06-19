import { RepositoryContributorsList } from "./RepositoryContributorsList";
import React from "react";
import styled from "styled-components";
import { StyledLink } from "./StyledLink";

const RepoCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
`;

const RepoCardBody = styled.div`
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1rem;
`;

const RepoCardHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);

  &:first-child {
    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
  }
`;

const RepoLanguage = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`;

const RepoLanguageBadge = styled.span`
  color: #fff;
  background-color: #007bff;
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const RepoCardTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
`;

export default function RepositoryCard({
  name,
  lastCommit,
  stars,
  description,
  loading,
  ownerName,
  ownerAvatar,
  ownerProfile,
  languages,
  contributors,
}) {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <RepoCard>
      <RepoCardHeader>
        {ownerAvatar && (
          <img
            style={{ marginRight: "1rem" }}
            src={ownerAvatar}
            alt={ownerName}
            width="50"
            height="50"
          />
        )}
        <RepoCardTitle>
          <StyledLink href={ownerProfile}>{ownerName}</StyledLink>
          <span style={{ margin: "0 0.25em" }}>/</span>
          {name}
        </RepoCardTitle>
        <span role="img" aria-label="Github stars">
          ⭐{stars}
        </span>
      </RepoCardHeader>
      <RepoCardBody>
        <RepoLanguage>
          {languages.length > 0 &&
            languages.map((language) => (
              <RepoLanguageBadge key={language}>{language}</RepoLanguageBadge>
            ))}
        </RepoLanguage>
        <p>{description}</p>
        <p>Last commit: {new Date(lastCommit).toLocaleString()}</p>

        {contributors.length > 0 && (
          <>
            <p>Top contributors:</p>
            <RepositoryContributorsList contributors={contributors} />
          </>
        )}
      </RepoCardBody>
    </RepoCard>
  );
}
