import { Link } from "react-router-dom";
import { Video } from "../Video.jsx";

export function VideoGame({ games }) {
    return (<>
        <div className="video-ctg container space-between mb-20" >
            <h2 className="ctg-s-title ">Popular in Game keys</h2>
            <div>
                <Link className="btn btn-view align-end  title cap" to="/game"> View all</Link>
            </div>
        </div>
        
        <div className="video-container grid-container container" >
            {games.map(game => {
                return (
                    <div className="game-video-container" key={`video${game._id}`}>
                        <Video url={game.videoUrls[0]} > </Video>
                        <Link to={`/game/${game._id}`}>{game.title}
                            <div className="link" >
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    </>
    )
}


