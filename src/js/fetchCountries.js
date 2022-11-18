export class ApiServices {
  #BASEURL = "https://restcountries.com/v3.1/name";

  constructor() {
    this.country = null;
  }

  getProducts() {
    return fetch(`${this.#BASEURL}/${this.country}`).then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
