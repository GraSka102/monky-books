import axios, { AxiosResponse, Method } from 'axios';
import { useEffect, useState } from 'react';

const baseUrl = 'https://api3.angular-buch.com';
/*
function isBooksArray(data: Book | Book[]): data is Book[] {
    return true;
}
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    let data = response.data;
    let bookWithDateObj: { book: Book, date: string };
    if (isBooksArray(data)) {
        data.map((book) => {
            bookWithDateObj = { book: book, date: new Date(book.published).toLocaleDateString() }
        })
    } else {
        bookWithDateObj = { book: book, date: new Date(book.published).toLocaleDateString() }
    }
    return response;
}, function (error) {

    return Promise.reject(error);
}); */

export function bookApi<T>(method: Method, path: string, callback: (data: T) => void, data = {}): void {
    const url = `${baseUrl}/${path}`;
    axios({
        method: method,
        url: url,
        data
    })
        .then((response: AxiosResponse<T>) => callback(response.data))
        .catch((error) => console.log('Error', error.message))
        .then(() => console.log("Request succeeded"))
}

export function UseBookApi<T>(method: Method, path: string): ([state: (T | undefined), setState: React.Dispatch<React.SetStateAction<T | undefined>>]) {
    const [state, setState] = useState<T>()

    useEffect(() => {
        bookApi(method, path, setState);

        return () => {
            // cleanup
        }
    }, [method, path])
    return [state, setState];
}
