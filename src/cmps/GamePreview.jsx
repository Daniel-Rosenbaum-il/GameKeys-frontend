import React from 'react'
import img1 from '../assets/img/gta.jpg'
import {Link} from 'react-router-dom'

export function GamePreview({ game }) {
    return (
        <Link to={`/game/${game._id}`}>
            <div className="game-card">
                <div className="card-img-preview">
                    <img src={img1} alt="gta main" className="img-preview"></img>
                </div>
                <div className="game-info">
                    <h2>{game.title}</h2>
                    <h2>{game.description}</h2>
                    <div className="game-btm-info">
                    <h2>{`$${game.price}`}</h2>
                    <h4>{game.tags.map(tag => <span>{tag} </span>)}</h4>
                    </div>
                </div>
            </div>
        </Link>
    )
}