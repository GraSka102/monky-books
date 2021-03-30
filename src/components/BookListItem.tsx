import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import Book from '../types/Book';

interface Props {
    children?: ReactElement
    book: Book
    countInCart?: number
}

export default function BookListItem(props: Props) {
    const history = useHistory();

    return (
        <div onClick={() => history.push(`/books/${props.book.isbn}`)} className="item" >
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
                        <span className="item" role="item" key={index}>{autor}<br /></span>
                    )}
                    <br />
                    {props.book.isbn}
                </div>
            </div>
            {props.children}
        </div >
    )
}
