import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { bookApi, UseBookApi } from '../shared/BookApi';
import Book from '../types/Book';
import { LoadingSpinner } from './LoadingSpinner';

export default function BookDetails() {
    const { isbn } = useParams<{ isbn: string }>()
    const history = useHistory()
    const [book] = (UseBookApi<Book>('get', `books/${isbn}`))

    const onDeleteBook = () => {
        bookApi('delete', `books/${isbn}`, onGoToList)
    }

    const onGoToList = () => {
        history.push('/books');
    }

    if (!book) {
        return <LoadingSpinner />
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

            <button className="ui green button" onClick={onGoToList}>Zurück zur Buchliste
                </button>
            {/*    <button className="ui green button"><Link to='/books'> Zurück zur Buchliste</Link>
            </button> */}
            <button className="ui red button" onClick={onDeleteBook}>Löschen
                </button>
            <button className="ui red button" onClick={() => history.push(`${isbn}/edit`)}>Bearbeiten
                </button>
        </>
    )
}
