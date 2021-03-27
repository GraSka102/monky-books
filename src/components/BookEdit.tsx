import React from 'react'
import { useParams } from 'react-router-dom'
import { UseBookApi } from '../shared/BookApi'
import Book from '../types/Book'
import BookForm from './BookForm'
import { LoadingSpinner } from './LoadingSpinner'

export default function BookEdit() {

    const { isbn } = useParams<{ isbn: string }>();
    const { state } = UseBookApi<Book>('get', `books/${isbn}`)
    const book = state
    if (!state) {
        <LoadingSpinner />
    }
    return (
        <>
            {!book
                ? <LoadingSpinner />
                : <BookForm book={book} isEdit={true} />
            }

        </>
    )
}
