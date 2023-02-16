import axios from "axios";
let userId = localStorage.getItem('userId')
class BookService {

  baseUrl = 'http://localhost:9094/book'


  getAllBooks() {
    return axios.get(`${this.baseUrl}` + "/getAll");
  }

  searchByBookName(search) {
    console.log(search);
    return axios.get(`${this.baseUrl}` + "/searchByName"+"/"+search)
  }

  getAllBooksSortedByPriceAsc() {
    return axios.get(`${this.baseUrl}` + "/sortAsc");
  }

  getAllBooksSortedByPriceDesc() {
    return axios.get(`${this.baseUrl}` + "/sortDesc");
  }

}

export default new BookService();
