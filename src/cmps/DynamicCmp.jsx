import { SmallGamePreview } from './DynamicCmps/SmallGamePreview.jsx'
import { MainGamePreview } from './DynamicCmps/MainGamePreview.jsx'
import { CtgList } from './DynamicCmps/CtgList.jsx';
import { VideoGame } from './DynamicCmps/VideoGame.jsx';

export function DynamicCmp({ games, type = 'main', src }) {
    const DynamicCmp = () => {
        switch (type) {
            case 'main':
                return (<div>
                    <MainGamePreview games={games} />
                </div>)
            case 'video':
                return (<div>
                    <VideoGame src={src} />
                </div>)
            case 'small':
                return (<>
                    <CtgList />
                    <h2 className="mb-20 container ">FROM DEVELOPERS AND PUBLISHERS THAT YOU KNOW</h2>
                    <div className="preview-container flex container">
                        {games.map((game, idx) => {
                            if (idx > 3) return
                            return <SmallGamePreview game={game} key={game._id} />
                        })}
                    </div>
                </>
                )
            default: return <></>
        }
    }
    return (
        <div className="home-game-list mb-20">
            <DynamicCmp />
        </div>
    )
}