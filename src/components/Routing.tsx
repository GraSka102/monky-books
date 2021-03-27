import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import BookCreate from './BookCreate'
import BookDetails from './BookDetails'
import BookEdit from './BookEdit'
import BookList from './BookList'
import Home from './Home'

export default function Routing() {
    return (
        <Switch>
            <Route path="/books/:isbn/create">
                <BookCreate />
            </Route>
            <Route path="/books/:isbn/edit">
                <BookEdit />
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
