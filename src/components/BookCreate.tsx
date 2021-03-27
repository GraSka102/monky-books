import React from 'react'
import Book from '../types/Book'
import BookForm from './BookForm'

export default function BookCreate() {

    const fillBook: Book = {
        isbn: '37891294451',
        title: 'Pippi Langstrumpf Gesamtausgabe ',
        authors: [' Astrid Lindgren', 'Max Musterman'],
        published: new Date("01-02-1987"),
        subtitle: 'Gesamtausgabe',
        thumbnails: [{
            url: 'https://media2.hugendubel.de/shop/coverscans/137/1375948_2147335_xl.jpg', title: 'Pipi'
        },
        {
            url: 'https://media2.hugendubel.de/shop/coverscans/739/7398138_7398138_xl.jpg', title: 'Pipi-Bild'
        }],
        description: `Pippilotta Viktualia Rollgardina Pfefferminz Efraimstochter Langstrumpf, kurz Pippi Langstrumpf genannt, wohnt mit ihrem Pferd und dem kleinen Affen Herrn Nilsson in der Villa Kunterbunt und macht, was sie will. Sie ist das stärkste Mädchen der Welt und hat vor nichts und niemandem Angst. Für Thomas und Annika steckt jeder Tag mit Pippi voller Abenteuer und aufregender Erlebnisse!

        Die Gesamtausgabe enthält die Einzelbände "Pippi Langstrumpf", "Pippi Langstrumpf geht an Bord" und "Pippi in Taka-Tuka-Land".
        
        "Pippi Langstrumpf ist die hinreißendste und fröhlichste Gestalt in der Kinderliteratur." (Frankfurter Allgemeine Zeitung) `
    }

    return (
        <BookForm book={fillBook} isEdit={false} />
    )
}
