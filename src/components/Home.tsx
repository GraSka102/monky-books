import React from 'react'
import { Link } from 'react-router-dom'
import { BookSearch } from './search/BookSearch'

export default function Home() {
    return (
        <div>
            <h4>Willkomen beim BookMonkey</h4>
            <Link to="/books" className="ui red button">Büchliste ansehen</Link>
            <br />
            <br />
            <BookSearch />
        </div>
    )
}
