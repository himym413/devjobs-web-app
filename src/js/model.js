import { async } from "regenerator-runtime";
import data from "../data.json";
import { RES_PER_PAGE } from "./config";

export const state = {
  jobs: [],
  filteredJobs: data,
  job: {},
  numberOfPages: 0,
  pageShown: 0,
};

export const setNumberOfPages = function () {
  state.numberOfPages = Math.ceil(state.filteredJobs.length / RES_PER_PAGE);
};

export const loadJobs = function () {
  state.jobs = state.filteredJobs.slice(
    state.pageShown * RES_PER_PAGE,
    (state.pageShown + 1) * RES_PER_PAGE
  );

  state.pageShown++;
};

export const getJob = function (id) {
  state.job = state.filteredJobs.find((job) => job.id === id);
};

export const filterJobs = function (filtersArr) {
  const position = filtersArr[0].toLowerCase();
  const location = filtersArr[1].toLowerCase();
  const contract = filtersArr[2];
  state.pageShown = 0;

  if (contract === "All") {
    state.filteredJobs = data;
  }

  if (contract === "Full Time") {
    state.filteredJobs = data.filter((job) => job.contract === contract);
  }

  if (position === "" && location === "") return;

  if (position !== "") {
    state.filteredJobs = state.filteredJobs.filter(
      (job) =>
        job.position.toLowerCase() === position ||
        job.position.toLowerCase().includes(position)
    );
  }

  if (location !== "") {
    state.filteredJobs = state.filteredJobs.filter(
      (job) => job.location.toLowerCase() === location
    );
  }
};
