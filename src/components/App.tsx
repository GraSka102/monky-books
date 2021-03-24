import React, { ReactElement, useState } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import Book from '../types/Book';
import BookDetails from './BookDetails';
import BookList from './BookList';

type ViewState = 'list' | 'details'

export default function App(): ReactElement {

  return (
    <BrowserRouter>
      <div className="ui menu">
        <NavLink to='/books' className="item">
          Bücher
        </NavLink>
        <NavLink to='/home' className="item">
          Home
        </NavLink>
      </div>

      <Switch>
        <Route path="/books/:isbn">
          <BookDetails />
        </Route>
        <Route path="/books">
          <BookList />
        </Route>
        <Route path="/home">
          <p>Home</p>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
