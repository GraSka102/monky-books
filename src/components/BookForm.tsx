import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { bookApi } from '../shared/BookApi';
import Book from '../types/Book';
import css from './App.module.css';

interface Prop {
    book: Book
    isEdit: boolean
}

export default function BookForm({ book: newBook, isEdit }: Prop) {
    const history = useHistory()

    const buildThumbnail = () => {
        return { url: '', title: '' }
    }

    const [isbn, setIsbn] = useState(newBook.isbn)
    const [title, setTitle] = useState(newBook.title)
    const [authors, setAuthors] = useState(newBook.authors)
    const [published, setPublished] = useState(newBook.published)
    const [subtitle, setSubtitle] = useState(newBook.subtitle)
    // const [rating, setRating] = useState('')
    const [thumbnails, setThumbnails] = useState(newBook.thumbnails)
    const [description, setDescription] = useState(newBook.description)

    const book = (): any => {
        return {
            isbn,
            title,
            authors,
            published,
            subtitle,
            thumbnails,
            description
        }
    }

    const onChangeAuthors = (index: any, value: string) => {
        setAuthors(currentAuthors => {
            const copyAuthors = [...currentAuthors]
            copyAuthors[index] = value
            return copyAuthors;
        })
    }

    const onAddAuthor = () => {
        setAuthors(() => [...authors, ''])
        console.log("authors:",)
    }

    const onDeleteAuthor = () => {
        setAuthors(currentAuthors => {
            const copyAuthors = [...currentAuthors]
            if (currentAuthors.length > 1) {
                copyAuthors.pop()
            }
            return copyAuthors
        })
    }

    const onChangeThumbnails = (index: number, attribute: string, value: string) => {
        setThumbnails(currentThumbnails => {
            const copyThumbnails = [...currentThumbnails]
            copyThumbnails[index] = { ...copyThumbnails[index], [attribute]: value }
            return copyThumbnails
        })
    }

    const onAddThumbnails = () => {
        setThumbnails(() => [...thumbnails, buildThumbnail()])
    }

    const onDeleteThumbnails = () => {
        setThumbnails(currentThumbnails => {
            const copyThumbnails = [...currentThumbnails]
            if (currentThumbnails.length > 0) {
                copyThumbnails.pop()
            }
            return copyThumbnails
        })
    }

    //   const onSubmit = (e: SyntheticEvent>) =>  kann man nicht auf target zugreifen.
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        isEdit
            ? bookApi('put', `book/${isbn}`, (() => history.push(`book/${isbn}`)), book())
            : bookApi('post', 'book', (() => history.push('/books')), book())
    }

    return (
        <form className={`${css.bookForm} ui form`} onSubmit={onSubmit} >
            <label>Buchtitel</label>
            <input required placeholder="Titel" onChange={(e) => setTitle(e.target.value)} value={title} />

            <label>Untertitel</label>
            <input placeholder="Subtitle" onChange={(e) => setSubtitle(e.target.value)} value={subtitle} />

            <label>Isbn</label>
            <input required readOnly={isEdit} pattern="\d{9}|\d{11}" placeholder="Isbn" onChange={(e) => setIsbn(e.target.value)} value={isbn} />

            <label>Erscheinungsdatum</label>
            <input required placeholder="Published" type="date" onChange={(e) => setPublished(new Date(e.target.value))} value={new Date(published).toISOString().substring(0, 10)} />

            <label>Authoren</label>
            <button onClick={onAddAuthor} className="ui mini button" type="button">+</button>
            <button onClick={onDeleteAuthor} className="ui mini button" type="button">-</button>
            <div className="fields">
                {authors.map((author, index) =>
                    <div key={index} className="sixteen wide field">
                        <input required placeholder="author" onChange={(e) => onChangeAuthors(index, e.target.value)} value={author} />
                    </div>
                )}
            </div>
            <label>Beschreibung</label>
            <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} />

            <label>Bilder</label>
            <button onClick={onAddThumbnails} className="ui mini button" type="button">+</button>
            <button onClick={onDeleteThumbnails} className="ui mini button" type="button">-</button>

            {
                thumbnails.map((thumbnail, index) =>
                    <div key={index} className="field">
                        <input required type="url" placeholder="Url" className="nine wide field" onChange={(e) => onChangeThumbnails(index, "url", e.target.value)} value={thumbnail.url} />
                        <input placeholder="Titel" className="seven wide field" onChange={(e) => onChangeThumbnails(index, "title", e.target.value)} value={thumbnail.title} />
                    </div>
                )
            }
            <button className="ui button">Submit</button>
        </form >
    )
}

