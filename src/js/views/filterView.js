class FilterView {
  #parentEl = document.querySelector(".main_container");
  #form = document.getElementById("filterForm");
  #title = document.getElementById("filterTitle");
  #locations = document.querySelectorAll("#filterLocation");
  #hours = document.querySelectorAll("#filterHours");
  #hoursCheckbox = document.querySelectorAll(".custom_checkbox_hours");
  #message = "No results for your filters. Please try again. :)";

  addHandlerFilterHours(handler) {
    this.#hoursCheckbox.forEach((el) => el.addEventListener("click", handler));
  }

  addHandlerFilter(handler) {
    this.#form.addEventListener("submit", handler);
  }

  renderMessage() {
    const markup = this.#generateMessage();
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  #generateMessage() {
    return `
    <p class="error_text">${this.#message}</p>
    `;
  }

  setValue(el) {
    const input = el
      .closest(".checkbox_hours_container")
      .querySelector("#filterHours");

    if (input.value === "All") return (input.value = "Full Time");

    input.value = "All";
  }

  getFilters() {
    let locationValue;
    this.#locations.forEach((loc) => {
      if (loc.value !== "") locationValue = loc.value;
    });
    if (locationValue === undefined) locationValue = "";

    let hourValue;
    this.#hours.forEach((hour) => {
      if (hour.value !== "All") hourValue = hour.value;
    });
    if (hourValue === undefined) hourValue = "All";

    return [this.#title.value, locationValue, hourValue];
  }
}

export default new FilterView();
