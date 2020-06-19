import React, { useEffect, useState } from "react";
import {
  fetchPopularRepos,
  fetchReposByName,
  transformRepositoryData,
} from "../api";
import { useLocalStorage } from "../hooks";
import Paginator from "../components/Paginator";
import RepositoriesList from "../components/RepositoriesList";
import { Button } from "../components/Button";
import { SearchInput } from "../components/SearchInput";
import styled from "styled-components";

const SearchForm = styled.form`
  display: flex;
  margin-bottom: 1rem;
`;

export default function Home() {
  const [repos, setRepos] = useState(null);
  const [totalRepos, setTotalRepos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useLocalStorage("search", "");
  const [page, setPage] = useLocalStorage("page", 1);

  const handleSearchTextChange = (event) => setQuery(event.target.value);

  const fetchInitialRepos = () => {
    return query ? fetchReposByName(query, page) : fetchPopularRepos(page);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setPage(1);
    fetchInitialRepos().then((data) => {
      setTotalRepos(data.total_count);
      setRepos(data.items.map(transformRepositoryData));
      setLoading(false);
    });
  };

  const handlePageClick = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setLoading(true);
    fetchInitialRepos().then((data) => {
      setTotalRepos(data.total_count);
      setRepos(data.items.map(transformRepositoryData));
      setLoading(false);
    });
  }, [page]);

  return (
    <>
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
        <Button type="submit">{loading ? "Searching" : "Search"}</Button>
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
