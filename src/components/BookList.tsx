import React from 'react';
import { bookApi, UseBookApi } from '../shared/BookApi';
import Book from '../types/Book';
import BookListItem from './BookListItem';
import { LoadingSpinner } from './LoadingSpinner';

export default function BookList() {

    const [books, setBooks] = (UseBookApi<Book[]>('get', 'books'))

    function restoreBooks() {
        bookApi<string>('delete', `books`, () => bookApi<Book[]>('get', `books`, setBooks));
    }

    if (!books) {
        return <LoadingSpinner />

    }
    if (books.length === 0) {
        return (
            <>
                <h3>Keine Bücher vorhanden</h3>
                <button onClick={restoreBooks}>
                    ZURÜCKSEETZEN
                </button>
            </>
        )
    }
    return (

        <div className="ui middle aligned selection divided list">
            {
                books.map((book: Book) =>
                    <BookListItem key={book.isbn} book={book}
                    />
                )}
        </div>
    )
}
