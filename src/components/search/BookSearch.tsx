import React, { useState } from 'react'
import { UseBookApi } from '../../shared/BookApi'
import Book from '../../types/Book'
import { LoadingSpinner } from '../LoadingSpinner'
import { Popup } from './Popup'

export function BookSearch() {

    const [foundBooks, setFoundBooks] = useState<Book[]>()
    const [isPopupOpen, setPopupOpen] = useState(false)

    const [books] = (UseBookApi<Book[]>('get', 'books'))

    const onInput = (e: any) => {
        (e.target.value !== "") ? setPopupOpen(true) : setPopupOpen(false)
    }

    const onInputChange = (value: string) => {
        const keyword = value
        search(keyword)
    }

    if (!books) {
        return <LoadingSpinner />
    }

    const search = (keyword: string) => {
        //ToDo RegexEscape
        const pattern = `[A-Za-z.\\s]*${keyword}[A-Za-z.\\s]*`
        const matchRegex = new RegExp(pattern)
        const foundBooks = books.filter((book) => matchRegex.test(book.title.toLowerCase()))
        setFoundBooks(foundBooks)
    }

    return (
        <div className="ui search">
            <div className="ui icon input">
                <input type="text" className="prompt" placeholder="suchbegrif angeben" onInput={onInput} onChange={(e) => onInputChange(e.target.value)} />
                <i className="search icon" />
            </div>

            {/*  <div className={`results transition visible=${(!foundBooks) ? false : true}`}> */}
            <div className="results transition visible">
                <div>
                    <Popup isPopupOpen={isPopupOpen} foundBooks={foundBooks} />
                </div>
                {/*  <Link className="result" to={URL}>
                    {TITLE}
                    <p className="description">
                        {SUBTITLE}
                    </p>
                </Link> */}
            </div>
        </div >
    )
}
