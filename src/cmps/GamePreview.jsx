import React from 'react'
import img1 from '../assets/img/gta.jpg'

export function GamePreview({game}) {
    return (
        <div className="main-preview">
            <img src={img1} alt="gta main" className="img-preview"></img>
            <h2>{game.title}</h2>
            <h2>{`$${game.price}`}</h2>
            {/* <img src="" */}
            <h4>{game.tags.map(tag => <span>{tag} </span>)}</h4>
        </div>
    )
}