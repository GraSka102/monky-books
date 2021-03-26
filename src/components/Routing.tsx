import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import BookDetails from './BookDetails'
import BookForm from './BookForm'
import BookList from './BookList'
import Home from './Home'

export default function Routing() {
    return (
        <Switch>
            <Route path="/books/create">
                <BookForm />
            </Route>
            <Route path="/books/:isbn">
                <BookDetails />
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
