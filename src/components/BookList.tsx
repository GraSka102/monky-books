import React from 'react'
import { books } from '../shared/books'
import Book from '../types/Book'
import BookListItem from './BookListItem'

interface Props {
    showDetails: (book: Book) => void
}

export default function BookList({ showDetails }: Props) {
    return (
        <div className="ui middle aligned selection divided list">
            {books.map(book => {
                return (
                    <BookListItem key={book.isbn} book={book} showDetails={showDetails} />
                )
            })}
        </div>

    )
}
