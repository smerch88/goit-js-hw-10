import createCountryCard from "./templates/productCard.hbs";
import create10Cards from "./templates/1to10.hbs";
import { ApiServices } from "./js/fetchCountries.js";
import { debounce } from "lodash";
import Notiflix from "notiflix";

const listEl = document.querySelector(".country-list");
const infoEl = document.querySelector(".country-info");
const formRef = document.querySelector("#search-box");

const apiServices = new ApiServices();

const searchData = (event) => {
  event.preventDefault();

  apiServices.country = event.target.value.trim();

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
    listEl.innerHTML = cards;
    infoEl.innerHTML = "";
  } else if (countries.length > 1 && countries.length <= 10) {
    cards = create10Cards(countries);
    infoEl.innerHTML = cards;
    listEl.innerHTML = "";
  } else if (countries.length > 10) {
    return Notiflix.Notify.info(
      "Too many matches found. Please enter a more specific name."
    );
  }
}

formRef.addEventListener("input", debounce(searchData, 300));
