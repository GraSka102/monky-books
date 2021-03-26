import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { bookApi } from '../shared/BookApi';
import Book from '../types/Book';
/* 
isbn: string;
title: string;
authors: string[];
published: Date;
subtitle ?: string;
rating ?: number;
thumbnails: Thumbnail[];
description ?: string; */

//const buildThumbnail = [{ url: '', title: '' }]

export default function BookForm() {
    const history = useHistory()

    const buildThumbnail = () => {
        return { url: '', title: '' }
    }
    const [isbn, setIsbn] = useState('')
    const [title, setTitle] = useState('')
    const [authors, setAuthors] = useState([''])
    const [published, setPublished] = useState('')
    const [subtitle, setSubtitle] = useState('')
    // const [rating, setRating] = useState('')
    const [thumbnails, setThumbnails] = useState([buildThumbnail()])
    const [description, setDescription] = useState('')

    const book = (): any => {
        return {
            isbn,
            title,
            authors,
            published: new Date(published).toString,
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
            if (currentThumbnails.length > 1) {
                copyThumbnails.pop()
            }
            return copyThumbnails
        })
    }

    //   const onSubmit = (e: SyntheticEvent>) => { - kann man nicht auf target zugreifen.
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("My Submit ")
        bookApi('post', 'book', (() => history.push('/books')), book())

    }

    return (
        <form className="ui form" onSubmit={onSubmit}>
            <label>Buchtitel</label>
            <input placeholder="Titel" onChange={(e) => setTitle(e.target.value)} value={title} />

            <label>Untertitel</label>
            <input placeholder="Subtitle" onChange={(e) => setSubtitle(e.target.value)} value={subtitle} />

            <label>Isbn</label>
            <input placeholder="Isbn" onChange={(e) => setIsbn(e.target.value)} value={isbn} />

            <label>Erscheinungsdatum</label>
            <input placeholder="Published" type="date" onChange={(e) => setPublished(e.target.value)} value={published} />

            <label>Authoren</label>
            <button onClick={onAddAuthor} className="ui mini button" type="button">+</button>
            <button onClick={onDeleteAuthor} className="ui mini button" type="button">-</button>
            <div className="fields">
                {authors.map((author, index) =>
                    <div key={index} className="sixteen wide field">
                        <input placeholder="author" onChange={(e) => onChangeAuthors(index, e.target.value)} value={author} />
                    </div>
                )}
            </div>
            <label>Beschreibung</label>
            <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} />

            <label>Bilder</label>
            <button onClick={onAddThumbnails} className="ui mini button" type="button">+</button>
            <button onClick={onDeleteThumbnails} className="ui mini button" type="button">-</button>

            {thumbnails.map((thumbnail, index) =>
                <div key={index} className="field">
                    <input placeholder="Url" className="nine wide field" onChange={(e) => onChangeThumbnails(index, "url", e.target.value)} value={thumbnail.url} />
                    <input placeholder="Titel" className="seven wide field" onChange={(e) => onChangeThumbnails(index, "title", e.target.value)} value={thumbnail.title} />
                </div>
            )
            }
            <button className="ui button">Submit</button>
        </form >
    )
}

