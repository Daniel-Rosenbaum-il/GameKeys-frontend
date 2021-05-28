import React from 'react'
import { GamePreview } from './GamePreview'

export function GameList({ games }) {
    console.log(games);
    return (
        <div className="game-list">
<<<<<<< HEAD
            {games.map(game => <GamePreview key={game._id} game={game}/> )}
=======
            {games.map(game => <GamePreview key={game._id} game={game} />)}
>>>>>>> e3ee5f3a30b5542f754400fa42d111988cba6887
        </div>
    )
}
