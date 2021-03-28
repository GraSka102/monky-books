import React, { useState } from 'react'
import { Popup } from './Popup'



export function BookSearch() {
    const [input, setInput] = useState('')
    const [result, setResult] = useState('')
    const [isPopupOpen, setPopupOpen] = useState(false)

    const onInputChange = (e: any) => {
        (e.target.value !== "") ? setPopupOpen(true) : setPopupOpen(false)
    }


    return (
        <div className="ui search">
            <h4>Suche</h4>
            <div className="ui icon input">
                <input type="text" className="prompt" placeholder="suchbegrif angeben" />
                <i className="search icon" />
            </div>
            <div className="results transition visible">
                <div>
                    <Popup isPopupOpen={isPopupOpen}
                        items={[{ name: "Lasagna" }, { name: "Noodles" }]} />
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
