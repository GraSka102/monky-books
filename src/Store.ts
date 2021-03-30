import Book from "./types/Book";

interface Store {
    shopingCart: Book[]
}

export const initialStore: Store = {
    shopingCart: [],
}

interface AddToCart {
    type: 'ADD_TO_CART'
    book: Book
}

interface RemoveFromCart {
    type: 'REMOVE_FROM_CART'
    book: Book
}

export type Actions = AddToCart | RemoveFromCart

export function reducer(store: Store, action: Actions): Store {

    switch (action.type) {
        case 'ADD_TO_CART': {
            return {
                ...store,
                shopingCart: [...store.shopingCart, action.book]
            }
        }

        case 'REMOVE_FROM_CART': {
            const index = store.shopingCart.map((sc) =>
                sc.isbn).indexOf(action.book.isbn)
            return {
                ...store,
                shopingCart: store.shopingCart.filter((sc, i) => i !== index)
            }
        }
    }
}
