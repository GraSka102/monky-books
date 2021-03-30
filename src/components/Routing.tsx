import React, { useReducer } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import BookCreate from './BookCreate'
import BookDetails from './BookDetails'
import BookEdit from './BookEdit'
import BookList from './BookList'
import Home from './Home'
import { BookSearch } from './search/BookSearch'
import { initialStore, reducer } from './../Store'
import Cart from './Cart'

export default function Routing() {
    const [store, dispatch] = useReducer(reducer, initialStore)
    return (
        <Switch>
            <Route path="/books/:isbn/create">
                <BookCreate />
            </Route>
            <Route path="/books/:isbn/edit">
                <BookEdit />
            </Route>
            <Route path="/books/search">
                <BookSearch />
            </Route>
            <Route path="/books/:isbn">
                <BookDetails dispatch={dispatch} shopingCart={store.shopingCart} />
            </Route>
            <Route path="/cart">
                <Cart dispatch={dispatch} shopingCart={store.shopingCart} />
            </Route>
            <Route path="/books">
                <BookList />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/">
                <Redirect to="/home" />
            </Route>
        </Switch>
    )
}
