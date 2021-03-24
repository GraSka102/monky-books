import axios, { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { bookApi, UseBookApi } from '../shared/BookApi';
import Book from '../types/Book'
import BookListItem from './BookListItem'

const baseUrl = 'https://api3.angular-buch.com';

interface Props {
    showDetails: (book: Book) => void
    showList: () => void
}

export default function BookList({ showDetails, showList }: Props) {
    const { state, setState } = (UseBookApi<Book[]>('get', 'books'))
    const books = state;
    const setBooks = setState;

    function restoreBooks() {
        //callback in callback
        bookApi<string>('delete', `books`, () => bookApi<Book[]>('get', `books`, setBooks));
    }

    if (!books) {
        return (<div className="ui active inverted dimmer">
            <div className="ui text loader large">Lade BookShelf ...</div>
        </div>
        )
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
                    <BookListItem key={book.isbn} book={book} showDetails={showDetails} />
                )}
        </div>
    )
}
