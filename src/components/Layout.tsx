import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { BookSearch } from './search/BookSearch'

interface Props {
    children: ReactElement
}
export default function Layout(props: any) {

    return (
        <>
            <div className="ui menu">
                <NavLink exact to='/books' className="item">Bücher</NavLink>
                <NavLink to='/home' className="item">Home</NavLink>
                <NavLink to='/books/:isbn/create' className="item">Neues Buch</NavLink>
                <NavLink to='/books/search' className="item right"><BookSearch /></NavLink>

            </div>

            <div>{props.children}</div>
        </>
    )
}
