import React from 'react'
import { books } from '../shared/books'
import BookListItem from './BookListItem'

export default function BookList() {
    return (

        <div className="ui middle aligned selection divided list">
            {books.map(book => {
                return (
                    <BookListItem key={book.isbn} book={book} />
                )
            })}
        </div>

    )
}
