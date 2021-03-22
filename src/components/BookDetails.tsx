import React from 'react'
import { books } from '../shared/books'
import Book from '../types/Book'

interface Props {
    book: Book;
    showList: () => void;
}

export default function BookDetails(props: Props) {
    const book = props.book;

    const getRatings = (): number[] => {
        const ratingArray = []
        for (let i = 0; i < (book.rating || 0); i++) {
            console.log(book.rating)
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
                            {book.published.toLocaleDateString()}
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
            {
                <button className="ui red button" onClick={props.showList}>Zurück zur Buchliste
                </button>
            }
        </>
    )
}