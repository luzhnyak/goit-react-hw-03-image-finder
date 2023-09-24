import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '8383420-2fd3a74e6fa7f1c43c1b3aa8e';

export class PixabayAPIService {
  constructor() {
    this.searchQuery = '';
    this._page = 1;
    this.per_page = 12;
    this.total = 0;
  }

  async fetchImages() {
    const responce = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: this.searchQuery,
        page: this._page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: this.per_page,
      },
    });

    this.total = responce.data.totalHits;

    return responce.data.hits.map(element => {
      return {
        small: element.webformatURL,
        large: element.largeImageURL,
        description: element.tags,
        filename:
          element.largeImageURL.split('/')[
            element.largeImageURL.split('/').length - 1
          ],
      };
    });
  }

  isMore() {
    return this._page * this.per_page < this.total && this._page !== 0;
  }

  get page() {
    return this._page;
  }

  set page(newPage) {
    this._page = newPage;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
