import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

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
            </div>

            <div>{props.children}</div>
        </>
    )
}
