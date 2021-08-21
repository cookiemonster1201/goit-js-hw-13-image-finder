export default class ImageSearchApi {
  constructor(key, url) {
    this.query = '';
    this.page = 1;
    this.key = key;
    this.baseUrl = url;
    this.searchOption = '';
    this.isEditorsChoice = false;
  }

  async fetchData() {
    const searchParams = new URLSearchParams({
      q: this.query,
      page: this.page,
      key: this.key,
      order: this.searchOption,
      editors_choice: this.isEditorsChoice,
    });
    const url = `${this.baseUrl}image_type=photo&orientation=horizontal&per_page=12&${searchParams}`;

    const response = await fetch(url);
    if (response.status === 404) {
      throw new Error();
    }
    const data = await response.json();
    return data.hits;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  get searchQuery() {
    return this.searchQuery;
  }

  set searchQuery(newQuery) {
    this.query = newQuery;
  }
}