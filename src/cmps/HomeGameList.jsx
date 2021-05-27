import {HomeGamePreview} from './HomeGamePreview.jsx'

export function HomeGameList({games}) {
    console.log(games);
    return (
        <div className="home-game-list">
            <h2>FROM DEVELOPERS AND PUBLISHERS THAT YOU KNOW</h2>
            <div className="flex">
               {games.map(game => <HomeGamePreview  game={game} key={game._id} />)}
            </div>
        </div>
    )
}