import React, { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../Store';
import Book from '../types/Book';
import BookListItem from './BookListItem';

export default function Cart() {
    const history = useHistory()
    const ctx = useStore()

    const uniqueBooks = ctx.store.shopingCart.reduce((acc: Book[], book) => {
        acc.find(book_ => book_.isbn === book.isbn) || acc.push(book)
        return acc
    }, [])
        .sort((bookA, bookB) => Number(bookA.isbn) - Number(bookB.isbn))

    const onAddOne = (e: SyntheticEvent, book: Book) => {
        e.stopPropagation()
        ctx.dispatch({ type: 'ADD_TO_CART', book })
        countInCart(book)
        history.push('/cart')
    }

    const onRemoveOne = (e: SyntheticEvent, book: Book) => {
        e.stopPropagation()
        ctx.dispatch({ type: 'REMOVE_FROM_CART', book })
        history.push('/cart')
    }

    const countInCart = (book: Book): number => {
        const inCart = ctx.store.shopingCart.filter((sc) => sc.isbn === book!.isbn)
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
                                <button className="ui button" onClick={(e) => onAddOne(e, book)}>Add One</button>
                                <button className="ui button" onClick={(e) => onRemoveOne(e, book)}>Remove One</button>
                            </div>
                        </BookListItem>
                    </div>
                )
            }
        </div >
    )
}
