import React, { ReactElement, useState } from 'react';
import Book from '../types/Book';
import BookDetails from './BookDetails';
import BookList from './BookList';

type ViewState = 'list' | 'details'

export default function App(): ReactElement {

  const [viewState, setViewState] = useState<ViewState>('list');
  const [book, setBook] = useState<Book>();

  const showDetails = (book: Book) => {
    setBook(book);
    setViewState('details');
    console.log("clicked im Child", book);
  }

  function showList() {
    setViewState('list')
    setBook(undefined)
    console.log("showList() aufgerufen")
  }
  return (
    <div className="ui container">
      { (book && viewState === 'details')
        ?
        <BookDetails book={book} showList={showList} />
        :
        <BookList showDetails={showDetails} />
      }
    </div>
  );
}
