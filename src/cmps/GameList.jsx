import React from 'react'
import {GamePreview} from './GamePreview'

export function GameList({games}) {
    console.log(games);
    return (
        <div className="game-list">
            <h2>list</h2>
            {games.map(game => <GamePreview key={game._id} game={game}/> )}
        </div>
    )
}
