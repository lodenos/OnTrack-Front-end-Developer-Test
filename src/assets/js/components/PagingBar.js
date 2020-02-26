import React from 'react';
import { Pagination } from 'react-bootstrap';
import AppContext from '../context/AppContext.js';

class PagingBar extends React.Component {
  paginationFirst() {
    this.context.updateIndex({index: 1});
  }

  paginationLast() {
    this.context.updateIndex({index: this.context.indexMax});
  }

  paginationNext() {
    if (this.context.index < this.context.indexMax)
      this.context.updateIndex({index: this.context.index + 1});
  }

  paginationPrev() {
    if (this.context.index > 1)
      this.context.updateIndex({index: this.context.index - 1});
  }

  render() {
    return (
      <Pagination className="justify-content-center">
        <Pagination.First onClick={this.paginationFirst.bind(this)}/>
        <Pagination.Prev onClick={this.paginationPrev.bind(this)}/>
        <Pagination.Item active>{this.context.index}</Pagination.Item>
        <Pagination.Next onClick={this.paginationNext.bind(this)}/>
        <Pagination.Last onClick={this.paginationLast.bind(this)}/>
      </Pagination>
    );
  }
}
PagingBar.contextType = AppContext;

export default PagingBar;
