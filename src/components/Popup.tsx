import React from 'react'
import { isTemplateSpan } from 'typescript'

interface Prop {
    isPopupOpen: boolean
    items: { name: string }[]
}
export function Popup(props: Prop) {

    const { items, isPopupOpen } = props
    if (!props.isPopupOpen) { return null }
    return (
        <div className="popup">
            <div className="container">
                <div className="content">
                    {items &&
                        items.map((item, idx) =>
                            <div key={idx} className="item" >
                                {item.name}
                            </div>
                        )
                    }
                    {!items && <div className="warning">Nothing Found!</div>}

                </div>
                <div className="footer"></div>

            </div>
            <div className="footer">Type keyword to search for food</div>
        </div>
    )
}
