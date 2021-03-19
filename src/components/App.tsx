import React, { ReactElement } from 'react';
import BookList from './BookList';

export default function App(): ReactElement {
  return (
    <div className="ui container">
      <BookList />
    </div>
    /*    <div className="ui active inverted dimmer">
         <div className="ui text loader large">Lade BookShelf ...</div>
       </div> */
  );
}
