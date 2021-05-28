import { SmallGamePreview } from './SmallGamePreview.jsx'
import { MainGamePreview } from './MainGamePreview.jsx'
import { CtgList } from './CtgList.jsx';

export function HomeGameList({ games }) {
    console.log(games);
    return (
        <div className="home-game-list">
            <div>
                {/* {games.map(game => <MainGamePreview game={game} key={game._id} />)} */}
                <MainGamePreview games={games} />
            </div>
            <CtgList />
            <h2 className="mb-20 container">FROM DEVELOPERS AND PUBLISHERS THAT YOU KNOW</h2>
            <div className="flex container">
                {games.map(game => <SmallGamePreview game={game} key={game._id} />)}
            </div>

        </div>
    )
}