const toggleDarkMode = document.querySelector(".slider");
const input = document.querySelector(".switch input");
const darkModeLS = localStorage.getItem("darkmode");
let darkMode = false;

const enableDarkMode = () => {
  if (input.checked === true) input.checked = false;
  document.body.classList.add("dark_theme");
  toggleDarkMode.classList.add("slider-move");
  toggleDarkMode.click();
  darkMode = true;
  localStorage.setItem("darkmode", "true");
};

const disableDarkMode = () => {
  if (input.checked === false) input.checked = true;
  document.body.classList.remove("dark_theme");
  toggleDarkMode.classList.remove("slider-move");
  toggleDarkMode.click();
  darkMode = false;
  localStorage.setItem("darkmode", "false");
};

// Enable dark mode based on users preference
if (
  (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  darkModeLS === "true"
) {
  enableDarkMode();
}

// Watch for changes of users preference
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    const newColorScheme = event.matches ? "dark" : "light";

    if (
      newColorScheme === "dark" &&
      !document.body.classList.contains("dark_theme") &&
      !toggleDarkMode.classList.contains("slider-move")
    ) {
      enableDarkMode();
    }

    if (
      newColorScheme === "light" &&
      document.body.classList.contains("dark_theme") &&
      toggleDarkMode.classList.contains("slider-move")
    ) {
      disableDarkMode();
    }
  });

toggleDarkMode.addEventListener("click", () => {
  if (!darkMode) return enableDarkMode();

  disableDarkMode();
});
