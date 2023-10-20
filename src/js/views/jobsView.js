class JobsView {
  #body = document.querySelector("body");
  #parentEl = document.querySelector(".main_container");
  #form = document.querySelector("#filterForm");
  #data;

  addHandlerRender(handler) {
    ["load", "hashchange"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerButton(handler) {
    document
      .querySelector(".button_load-more")
      .addEventListener("click", handler);
  }

  renderButton() {
    const button = document.querySelector(".button_load-more");
    if (button) return;
    const markup = `<button class="button_primary | button_load-more">Load More</button>`;
    this.#parentEl.insertAdjacentHTML("afterend", markup);
  }

  removeButton() {
    const button = document.querySelector(".button_load-more");
    if (button) button.remove();
  }

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#showForm();
    if (this.#body.dataset.page === "details_page") {
      this.#body.dataset.page = "";
      this.clearParent();
    }
    this.#removeFooter();
    this.#parentEl.insertAdjacentHTML("beforeend", markup);
  }

  clearParent() {
    this.#parentEl.innerHTML = "";
  }

  #removeFooter() {
    document.querySelector("footer")?.remove();
  }

  #showForm() {
    this.#form.classList.remove("hidden");
  }

  #generateMarkup() {
    return this.#data
      .map(
        (job) => `
    <div class="job_padding-container | job_card">
      <div class="company_logo company_logo-${job.company
        .split(" ")
        .join("")
        .toLowerCase()}"></div>
      <div class="flex | job_card_about">
        <div class="flex | top_part">
          <div class="flex | time_and_hours">
            <p class="time">${job.postedAt}</p>
            <p class="hours">${job.contract}</p>
          </div>
          <a href="#${job.id}" class="title"><h3>${job.position}</h3></a>
          <p class="company">${job.company}</p>
        </div>
        <h4 class="location">${job.location}</h4>
      </div>
    </div>
    `
      )
      .join("");
  }
}

export default new JobsView();
