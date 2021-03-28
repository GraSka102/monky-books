import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Book from '../../types/Book'

interface Props {
    isPopupOpen: boolean
    foundBooks: Book[] | undefined
}
export function Popup({ isPopupOpen, foundBooks }: Props) {
    const history = useHistory();

    if (!isPopupOpen) { return null }
    if (!foundBooks) { return <div className="warning">Kein Buch gefunden!</div> }
    return (
        <div className="popup">
            <div className="container">
                <div className="content">
                    {foundBooks!.map((book, idx) =>
                        <div key={idx} className="item" >
                            <Link className="result" to={`/books/${book.isbn}`}>
                                <h4> {book.title}</h4>
                                <p className="description">
                                    {book.subtitle}
                                </p>
                            </Link>
                        </div>
                    )
                    }
                </div>
                <div className="footer"></div>
            </div>
        </div>
    )
}
