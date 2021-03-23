import axios, { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
//import { books } from '../shared/books'
import Book from '../types/Book'
import BookListItem from './BookListItem'
import { baseUrl } from '../shared/util'

interface Props {
    showDetails: (book: Book) => void
    showList: () => void
}

export default function BookList({ showDetails, showList }: Props) {

    const [books, setBooks] = useState<Book[]>();

    useEffect(() => {
        axios.get(`${baseUrl}/books`)
            .then((response: AxiosResponse<Book[]>) => {
                if (response.data) {
                    console.log("Bücher sind da" + typeof (response.data))
                    setBooks(response.data)
                }
                else {
                    console.log("Keine Bücher mehr");
                }
            }
            )
            .catch((error: AxiosError) => console.log('Error', error.message))
            .then(() => console.log("Request succeeded"))

    }, [])

    const restoreBooks = () => {
        axios.delete(`${baseUrl}/books`)
            .then((response: AxiosResponse<Book[]>) => {
                if (response.data) {
                    axios.get(`${baseUrl}/books`)
                        .then((response: AxiosResponse<Book[]>) => {
                            if (response.data) {
                                console.log("Bücher sind da" + typeof (response.data))
                                setBooks(response.data)
                            }
                            else {
                                console.log("Keine Bücher mehr");
                            }
                        }
                        )
                        .catch((error: AxiosError) => console.log('Error', error.message))
                        .then(() => console.log("Request succeeded"))

                    console.log("Gelöscht Bücher sind da" + typeof (response.data))

                }
                else {
                    console.log("Keine Bücher mehr");
                }
            }
            )
            .catch((error: AxiosError) => console.log('Error', error.message))
            .then(() => {
                console.log("Request succeeded")
                showList();
            })
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
                books.map((book) =>
                    <BookListItem key={book.isbn} book={book} showDetails={showDetails} />
                )}
        </div>
    )
}
