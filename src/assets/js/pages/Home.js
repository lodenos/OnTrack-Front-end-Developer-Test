import React from "react";
import Books from '../components/Books.js';
import SearchBar from '../components/SearchBar.js';
import PagingBar from '../components/PagingBar.js';
import AppContext from '../context/AppContext.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.contextValue = {
      books: {},
      count: 0,
      filters: [{type: "all", values: ['']}],
      index: 1,
      indexMax: 1,
      searchFilters: this.searchFilters.bind(this),
      textInput: '',
      updateBooks: this.updateBooks.bind(this),
      updateIndex: this.updateIndex.bind(this),
      waiting: true,
    };
  }

  componentDidMount() {
    this.getPermalink();
    this.callAPI();
  }

  callAPI() {
    this.contextValue.waiting = true;
    fetch('http://nyx.vima.ekt.gr:3000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'page': this.contextValue.index,
        'itemsPerPage': 20,
        'filters': this.contextValue.filters
      })
    }).then(response => {
      response.json().then(data => {
        this.updateBooks({books: data.books, count: data.count});
      });
      this.contextValue.waiting = false;
    });
  }

  getPermalink() {
    if (this.props.match.params.index === undefined)
      this.contextValue.index = 1;
    if (isNaN(this.contextValue.index = parseInt(this.contextValue.index)))
      this.contextValue.index = 1;
    if (this.props.match.params.filters === undefined)
      this.contextValue.textInput = '';
    this.contextValue.filters.values = [this.contextValue.textInput]
  }

  reflectURL() {
    let relic = '/' + this.contextValue.index.toString();
    if (this.contextValue.textInput != '')
      relic += '/' + this.contextValue.textInput;
    this.props.history.push(relic);
  }

  updateBooks(event) {
    this.contextValue.books = event.books;
    this.contextValue.count = event.count;
    this.contextValue.indexMax = Math.trunc(this.contextValue.count / 20) + 1;
    this.reflectURL();
    this.forceUpdate();
  }

  searchFilters() {
    this.contextValue.filters.values = [this.contextValue.textInput]
    this.contextValue.index = 1;
    this.callAPI();
  }

  updateIndex(event) {
    this.contextValue.index = event.index;
    this.callAPI();
  }

  render() {
    return (
      <AppContext.Provider value={this.contextValue}>
        <div className="container">
          <SearchBar />
          <Books />
          <PagingBar />
        </div>
      </AppContext.Provider>
    );
  }
}

export default Home;
