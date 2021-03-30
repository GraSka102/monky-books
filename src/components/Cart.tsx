import React from 'react';
import { useHistory } from 'react-router-dom';
import { Actions } from '../Store';
import Book from '../types/Book';
import BookListItem from './BookListItem';

interface Props {
    dispatch: React.Dispatch<Actions>
    shopingCart: Book[]
}
export default function Cart({ dispatch, shopingCart }: Props) {
    const history = useHistory()

    const uniqueBooks = shopingCart.reduce((acc: Book[], book) => {
        acc.find(book_ => book_.isbn === book.isbn) || acc.push(book)
        return acc
    }, [])
        .sort((bookA, bookB) => Number(bookA.isbn) - Number(bookB.isbn))

    const onAddOne = (book: Book) => {
        dispatch({ type: 'ADD_TO_CART', book })
        countInCart(book)
        history.push('/cart')
    }

    const onRemoveOne = (book: Book) => {
        dispatch({ type: 'REMOVE_FROM_CART', book })
        history.push('/cart')
    }

    const countInCart = (book: Book): number => {
        const inCart = shopingCart.filter((sc) => sc.isbn === book!.isbn)
        console.log("In Cart" + inCart.length)
        return inCart.length;
    }

    return (
        < div className="ui middle aligned selection divided list" >
            {
                uniqueBooks.map((book, index) =>
                    <div key={index}>
                        <BookListItem book={book} countInCart={countInCart(book)}>
                            <div className="right floated content">
                                <div className="ui label">
                                    <i className="shopping cart icon" />{countInCart(book)}</div>
                                <button className="ui button" onClick={() => onAddOne(book)}>Add One</button>
                                <button className="ui button" onClick={() => onRemoveOne(book)}>Remove One</button>
                            </div>
                        </BookListItem>
                    </div>
                )
            }
        </div >
    )
}
