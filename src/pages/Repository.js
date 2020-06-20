import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  fetchRepoById,
  fetchRepoContributors,
  fetchRepoLanguages,
} from "../api";
import { ErrorAlert } from "../components/ErrorAlert";
import RepositoryCard from "../components/RepositoryCard";
import { StyledLink } from "../components/StyledLink";

const BackLink = styled(StyledLink)`
  display: block;
  margin-bottom: 1rem;
`;

export default function Repository() {
  const { repoId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [repoLanguages, setRepoLanguages] = useState([]);
  const [repoContributors, setRepoContributors] = useState([]);
  const [repo, setRepo] = useState({});

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        setLoading(true);
        const repo = await fetchRepoById(repoId);
        setRepo(repo || {});
        const contributors = await fetchRepoContributors(
          repo.ownerName,
          repo.name
        );
        setRepoContributors(contributors);
        const languages = await fetchRepoLanguages(repo.ownerName, repo.name);
        setRepoLanguages(languages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepo();
  }, []);

  if (error) {
    return (
      <>
        <BackLink as={Link} to="/">
          &#8592; Back to repositories list
        </BackLink>
        {error && <ErrorAlert>{error.message}</ErrorAlert>}
      </>
    );
  }

  return (
    <>
      <BackLink as={Link} to="/">
        &#8592; Back to repositories list
      </BackLink>
      {repo && (
        <RepositoryCard
          {...repo}
          loading={loading}
          contributors={repoContributors}
          languages={repoLanguages}
        />
      )}
    </>
  );
}
