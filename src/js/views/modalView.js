class ModalView {
  #buttonModal = document.querySelector(".button_filter");
  #modal = document.querySelector(".modal_filter");
  #overlay = document.querySelector(".overlay");

  addHandlerModal(handler) {
    [this.#buttonModal, this.#overlay].forEach((el) =>
      el.addEventListener("click", handler)
    );
  }

  checkSubmitter(e) {
    if (e.submitter.classList.contains("button_search-modal"))
      this.toggleModal();
  }

  toggleModal() {
    this.#modal.classList.toggle("hidden");
    this.#overlay.classList.toggle("hidden");
  }
}

export default new ModalView();
