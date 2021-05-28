import React from 'react'
import { GamePreview } from './GamePreview'

export function GameList({ games }) {
    console.log(games);
    return (
        <div className="game-list">
            {games.map(game => <GamePreview key={game._id} game={game} />)}
        </div>
    )
}
