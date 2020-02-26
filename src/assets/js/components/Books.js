import React from 'react';
import { ListGroup } from 'react-bootstrap';
import AppContext from '../context/AppContext.js';

function Books() {
  const {books, waiting} = React.useContext(AppContext);
  if (waiting == true)
    return (<h3 className="text-center text-primary">Waiting Data ...</h3>);
  if (Object.entries(books).length === 0)
    return (<h3 className="text-center text-primary">Not Found :'(</h3>);
  return (books.map((book) =>
    <ListGroup className="text-primary" key={book.id}>
      <ListGroup.Item>
        <h4>{book.book_title}</h4>
        <li>Author : {book.book_author}</li>
        <li>Publication Year : {book.book_publication_year}</li>
        <li>Publication Country : {book.book_publication_country}</li>
        <li>Publication City : {book.book_publication_city}</li>
        <li >Pages : {book.book_pages}</li>
      </ListGroup.Item>
    </ListGroup>
  ));
}

export default Books;
