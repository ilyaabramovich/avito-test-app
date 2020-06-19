import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchRepoById,
  fetchRepoLanguages,
  fetchRepoContributors,
} from "../api";
import styled from "styled-components";
import RepositoryCard from "../components/RepositoryCard";

const BackLink = styled(Link)`
  display: block;
  margin-bottom: 1rem;
`;

export default function Repository() {
  const { repoId } = useParams();
  const [loading, setLoading] = useState(false);
  const [repoLanguages, setRepoLanguages] = useState([]);
  const [repoContributors, setRepoContributors] = useState([]);
  const [repo, setRepo] = useState({});

  useEffect(() => {
    setLoading(true);
    fetchRepoById(repoId).then((repo) => {
      setRepo(repo || {});
      fetchRepoContributors(repo.ownerName, repo.name).then((contributors) =>
        setRepoContributors(contributors)
      );
      fetchRepoLanguages(repo.ownerName, repo.name).then((languages) =>
        setRepoLanguages(languages)
      );
      setLoading(false);
    });
  }, []);

  return (
    <>
      <BackLink to="/">Back to repositories list</BackLink>
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
