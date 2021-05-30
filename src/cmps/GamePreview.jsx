import React from 'react'
import { Link } from 'react-router-dom'

export function GamePreview({ game }) {
    const previewImg = require(`../assets/img/${game.imgs.largeImgUrls[0]}`).default
    return (
        <div>
            <Link to={`/game/${game._id}`} key="555">
                <div className="game-card ">

                    <div className="card-img-preview">
                        <img src={previewImg} alt="game-preview-img"  className="img-preview"></img>
                    </div>
                    <div className="game-info">
                        <div className="game-top-info">

                            <h2>{game.title}</h2>
                            <p>{game.sDescription}</p>
                        </div>
                        <div className="game-btm-info">
                            <h4>{game.tags.map(tag => <span>{tag} </span>).slice(0,4)}</h4>
                            <p>{`$${game.price}`}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}