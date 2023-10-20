import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model";
import jobsView from "./views/jobsView";
import modalView from "./views/modalView";
import filterView from "./views/filterView";
import detailsView from "./views/detailsView";

const controlJobs = function (e) {
  // get hash as id
  const id = +window.location.hash.slice(1);
  // if there is a hash (id), render job details page
  if (id !== 0) return controlDetails(id);

  // if there is no hash, render all jobs and reset pageShown
  if (e.type === "hashchange") model.state.pageShown = 0;

  model.setNumberOfPages();
  model.loadJobs();
  jobsView.render(model.state.jobs);

  // Based on number of results, render or remove a button
  if (model.state.pageShown < model.state.numberOfPages) {
    jobsView.renderButton();
    jobsView.addHandlerButton(controlJobs);
  } else jobsView.removeButton();
};

const controlModal = function (e) {
  e.preventDefault();
  modalView.toggleModal();
};

const controlHours = function (e) {
  filterView.setValue(e.target);
};

const controlFilter = function (e) {
  // if form is submitted from modal, close modal
  modalView.checkSubmitter(e);

  const filtersArr = filterView.getFilters();

  model.filterJobs(filtersArr);
  jobsView.clearParent();

  if (model.state.filteredJobs.length === 0) filterView.renderMessage();

  controlJobs(e);
};

const controlDetails = function (id) {
  model.getJob(id);
  jobsView.removeButton();
  detailsView.render(model.state.job);
};

const init = function () {
  jobsView.addHandlerRender(controlJobs);
  modalView.addHandlerModal(controlModal);
  filterView.addHandlerFilterHours(controlHours);
  filterView.addHandlerFilter(controlFilter);
};
init();
