class DetailsView {
  #body = document.querySelector("body");
  #parentEl = document.querySelector(".main_container");
  #form = document.querySelector("#filterForm");
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#hideForm();
    this.#body.dataset.page = "details_page";
    this.clearParent();
    this.#parentEl.insertAdjacentHTML("beforeend", markup);
    this.#generateFooter();
  }

  clearParent() {
    this.#parentEl.innerHTML = "";
  }

  #hideForm() {
    this.#form.classList.add("hidden");
  }

  #generateMarkup() {
    console.log(this.#data);
    return `
    <div class="flex company_card_padding-container | company_card">
      <div>
      <div class="company_logo company_logo-${this.#data.company
        .split(" ")
        .join("")
        .toLowerCase()}"></div>
        <div class="flex">
          <h2 class="company_name">${this.#data.company}</h2>
          <p class="company_url">${this.#data.company.toLowerCase()}.com</p>
        </div>
      </div>
      <a href="${
        this.#data.website
      }" target="_blank" class="button_secondary | button_company-site"
        >Company Site</a
      >
    </div>

    <div class="about_padding-container | about_section">
      <div class="flex | about_section_top">
        <div>
          <div class="flex | about_section_top_time-and-hours">
            <p class="about_section_top-time">${this.#data.postedAt}</p>
            <p class="about_section_top-hours">${this.#data.contract}</p>
          </div>
          <h1 class="about_section_top-title">${this.#data.position}</h1>
          <h4 class="about_section_top-location">${this.#data.location}</h4>
        </div>
        <a href="${
          this.#data.apply
        }" target="_blank" class="button_primary | button_apply">Apply Now</a>
      </div>

      <p class="about_section_description">
            ${this.#data.description}
      </p>

      <h3 class="about_section_requirements-title">Requirements</h3>
      <p class="about_section_requirements">
            ${this.#data.requirements.content}
      </p>
      <ul class="about_section_requirements-list">
        ${this.#generateItems()}
      </ul>

      <h3 class="about_section_tasks-title">What You Will Do</h3>
      <p class="about_section_tasks">
            ${this.#data.role.content}
      </p>
      <ul class="about_section_tasks-list">
        ${this.#generateItems(false)}
      </ul>
    </div>
    `;
  }

  #generateFooter() {
    const markup = `
    <footer>
    <div class="flex footer_padding-container | footer_container">
      <div class="footer_left">
        <h3>${this.#data.position}</h3>
        <p>So Digital Inc.</p>
      </div>
      <a href="${
        this.#data.apply
      }" target="_blank" class="button_primary | button_apply-footer">Apply Now</a>
    </div>
    </footer>
    `;

    this.#body.insertAdjacentHTML("beforeend", markup);
  }

  #generateItems(req = true) {
    return this.#data.requirements.items
      .map(
        (item) => `
    <li class=${
      req
        ? "about_section_requirements-list-item"
        : "about_section_tasks-list-item"
    }>
    ${item}
    </li>
    `
      )
      .join("");
  }
}

export default new DetailsView();
