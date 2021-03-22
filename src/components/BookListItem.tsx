import React from 'react'
import Book from '../types/Book'

interface Props {
    book: Book,
    showDetails: (book: Book) => void
}

export default function BookListItem(props: Props) {


    return (
        <div onClick={() => { props.showDetails(props.book) }} className="item" >
            {props.book.thumbnails.map((thumbnail, index) =>
                <img key={index} className="ui tiny image" alt={thumbnail.title} src={thumbnail.url} />
            )}
            <div className="content">
                <div className="header">
                    {props.book.title}
                </div>
                <div className="description">
                    {props.book.subtitle}
                </div>
                <div className="metadata">
                    {props.book.authors.map((autor, index) =>
                        <span className="item" role="item" key={index}>{autor}</span>
                    )}
                    <br />
                    {props.book.isbn}
                </div>
            </div>
        </div>
    )
}
