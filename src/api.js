import axios from "axios";
import { REPOS_PER_PAGE, TOP_CONTRIBUTORS_COUNT } from "./constants";

const api = axios.create({
  baseURL: "https://api.github.com",
  responseType: "json",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

export const transformRepositoryData = ({
  id,
  html_url,
  name,
  description,
  pushed_at,
  stargazers_count,
  owner,
  languages_url,
}) => ({
  id,
  url: html_url,
  name,
  description,
  lastCommit: pushed_at,
  stars: stargazers_count,
  ownerName: owner.login,
  ownerAvatar: owner.avatar_url,
  ownerProfile: owner.html_url,
  languagesUrl: languages_url,
});

const transformContributorsData = ({ id, login, avatar_url, html_url }) => ({
  id,
  url: html_url,
  name: login,
  avatar: avatar_url,
});

export const fetchRepoLanguages = (owner, repoName) =>
  api
    .get(`repos/${owner}/${repoName}/languages`)
    .then(({ data }) => Object.keys(data));

export const fetchRepoContributors = (owner, repoName) =>
  api
    .get(`repos/${owner}/${repoName}/contributors`, {
      params: {
        per_page: TOP_CONTRIBUTORS_COUNT,
      },
    })
    .then(({ data }) => data.map(transformContributorsData));

export const fetchPopularRepos = (page) =>
  api
    .get("/search/repositories", {
      params: {
        q: "stars:>1",
        sort: "stars",
        order: "desc",
        page,
        per_page: REPOS_PER_PAGE,
      },
    })
    .then(({ data }) => data);

export const fetchRepoById = (repoId) =>
  api
    .get(`/repositories/${repoId}`)
    .then(({ data }) => transformRepositoryData(data));

export const fetchReposByName = (query, page = 1) =>
  api
    .get("/search/repositories", {
      params: {
        q: `${query} in:name`,
        sort: "stars",
        order: "desc",
        page,
        per_page: REPOS_PER_PAGE,
      },
    })
    .then(({ data }) => data);
