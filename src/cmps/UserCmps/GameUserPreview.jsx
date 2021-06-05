import React from 'react'

export function GameUserPreview({ order }) {
    const { game } = order
    if (!game) return <h1>You dont have games yet</h1>
    console.log(game.img);
    // const img = 
    return (
        <div className="game-user-preview">
            <div className="user-game-card">
                <div className="user-game-card-img">
                    <img src={require(`../../assets/img/${game.img}`).default}></img>
                </div>
                <div className="user-game-title">
                    <h2>{game.title}</h2>
                </div>
            </div>

        </div>
    )
}
