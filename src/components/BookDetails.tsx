import React, { useEffect, useState } from 'react'
//import { books } from '../shared/books'
import Book from '../types/Book'

import { baseUrl } from '../shared/util'
import axios, { AxiosError, AxiosResponse } from 'axios';
import AxiosRequestConfig from 'axios'


interface Props {
    book: Book;
    showList: () => void;
}


export default function BookDetails(props: Props) {
    //const book = props.book;

    //const url = `${baseUrl}/books/${props.book.isbn}`
    const [book, setBook] = useState<Book>()
    const [url] = useState<string>(`${baseUrl}/books/${props.book.isbn}`)
    const [deleteCurrentBook, setDeleteCurrentBook] = useState(false)

    useEffect(() => {
        //    httpRequest(url, 'get')
        axios({
            method: 'get',
            url: url
        })
            .then((response: AxiosResponse<Book>) => setBook(response.data))
            .catch((error) => console.log('Error', error.message))
            .then(() => console.log("Request succeeded"))
    }, [])


    /*  const httpRequest = (url: string, httpMethod?: any) => {
         axios({
             method: httpMethod,
             url: url
         })
             .then((response: AxiosResponse<Book>) => setBook(response.data))
             .catch((error) => console.log('Error', error.message))
             .then(() => console.log("Request succeeded"))
     } */

    const onDeleteBook = () => {
        console.log("Lösche Buch")
        axios({
            method: 'delete',
            url: url
        })
            .then((response: AxiosResponse) => {
                console.log("Buch gelöscht")
                props.showList();
            })
            .catch((error) => console.log('Error', error.message))
            .then(() => console.log("Delete-Request erfolgreich"))

        console.log("End Lösche Buch")

    }

    if (!book) {
        return <p>... is Loading</p>
    }

    const getRatings = (): number[] => {
        const ratingArray = []
        for (let i = 0; i < (book?.rating || 0); i++) {
            console.log(book?.rating)
            ratingArray.push(i)
        }
        return ratingArray
    }

    return (
        <>
            <div>
                <h1>{book.title}</h1>
                <div className="ui divider"></div>
                <div className="ui grid">
                    <div className="four wide column">
                        {book.authors.map((autor, index) =>
                            <div key={index}>
                                <span >{autor}</span>
                                <br />
                            </div>
                        )}
                    </div>
                    <div className="four wide column">
                        <h4>ISBN</h4>
                        <h4>{book.isbn}</h4>
                    </div>
                    <div className="four wide column">
                        <h4>Erschienen</h4>
                        <p>
                            {new Date(book.published).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="four wide column">
                        <h4>Rating</h4>
                        {getRatings().map((number) =>
                            <i key={number} className="star middle aligned yellow fill icon" ></ i>
                        )}
                    </div>
                </div>
                <h4>Beschreibung</h4>
                <p>{book.description}</p>
                <div className="ui small images">
                    <img src={book.thumbnails[0].url} />
                </div>
            </div >

            <button className="ui green button" onClick={props.showList}>Zurück zur Buchliste
                </button>
            <button className="ui red button" onClick={onDeleteBook}>Buch entfernen
                </button>

        </>
    )
}
