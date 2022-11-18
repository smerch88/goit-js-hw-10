import createCountryCard from "./templates/productCard.hbs";
import create10Cards from "./templates/1to10.hbs";
import { ApiServices } from "./js/fetchCountries.js";
var debounce = require("lodash.debounce");
import Notiflix from "notiflix";

const listEl = document.querySelector(".country-list");
const formRef = document.querySelector("#search-box");

const apiServices = new ApiServices();

const searchData = (event) => {
  event.preventDefault();
  debounce(function () {}, 300);

  apiServices.country = event.currentTarget.value;

  apiServices
    .getProducts()
    .then((data) => renderProducts(data))
    .catch((error) => {
      if (error.message === "404") {
        Notiflix.Notify.failure("Oops, there is no country with that name");
      }
      listEl.innerHTML = "";
    });
};

// Вивід через handleBars
function renderProducts(countries) {
  let cards;
  if (countries.length === 1) {
    cards = createCountryCard(countries);
  } else if (countries.length > 1 && countries.length <= 10) {
    cards = create10Cards(countries);
  } else if (countries.length > 10) {
    return Notiflix.Notify.info(
      "Too many matches found. Please enter a more specific name."
    );
  }
  listEl.innerHTML = cards;
}

formRef.addEventListener("input", searchData);
