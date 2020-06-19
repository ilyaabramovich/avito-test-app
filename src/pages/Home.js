import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  fetchPopularRepos,
  fetchReposByName,
  transformRepositoryData,
} from "../api";
import { Button } from "../components/Button";
import { ErrorAlert } from "../components/ErrorAlert";
import Paginator from "../components/Paginator";
import RepositoriesList from "../components/RepositoriesList";
import { SearchInput } from "../components/SearchInput";
import { useLocalStorage } from "../hooks";

const SearchForm = styled.form`
  display: flex;
  margin-bottom: 1rem;
`;

export default function Home() {
  const [repos, setRepos] = useState(null);
  const [totalRepos, setTotalRepos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useLocalStorage("search", "");
  const [page, setPage] = useLocalStorage("page", 1);

  const handleSearchTextChange = (event) => setQuery(event.target.value);

  const fetchInitialRepos = () => {
    return query ? fetchReposByName(query, page) : fetchPopularRepos(page);
  };

  const fetchRepos = async () => {
    try {
      setLoading(true);
      const data = await fetchInitialRepos();
      setTotalRepos(data.total_count);
      setRepos(data.items.map(transformRepositoryData));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    fetchRepos();
  };

  const handlePageClick = (page) => {
    setPage(page);
  };

  useEffect(() => {
    fetchRepos();
  }, [page]);

  return (
    <>
      {error && <ErrorAlert>{error.message}</ErrorAlert>}
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          value={query}
          onChange={handleSearchTextChange}
          type="search"
          id="search-repo"
          name="q"
          placeholder="Search GitHub repositories"
          aria-label="Search GitHub repositories"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Searching" : "Search"}
        </Button>
      </SearchForm>
      {repos && repos.length === 0 && (
        <p>No repositories with the given name were found.</p>
      )}
      {repos && repos.length > 0 && (
        <>
          <RepositoriesList loading={loading} repos={repos} />
          <Paginator
            page={page}
            total={totalRepos}
            onPageClick={handlePageClick}
          />
        </>
      )}
    </>
  );
}
