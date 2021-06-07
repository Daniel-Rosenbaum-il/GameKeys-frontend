import { Link } from "react-router-dom";
import { Video } from "../Video";

export function VideoGame({ games }) {
    console.log(games);
    console.log('cideoooooooooooooooo');
    return (
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
            {/* <div>
                <Video url="https://www.youtube.com/embed/Jioo5uXoNLg" > </Video>
            </div>
            <div>
                <Video url="https://www.youtube.com/embed/Jioo5uXoNLg" > </Video>
            </div>
            <div>
                <Video url="https://www.youtube.com/embed/Jioo5uXoNLg" > </Video>
            </div>
            <div>
                <Video url="https://www.youtube.com/embed/Jioo5uXoNLg" > </Video>
            </div>
            <div>
                <Video url="https://www.youtube.com/embed/Jioo5uXoNLg" > </Video>
            </div>
            <div>
                <Video url="https://www.youtube.com/embed/Jioo5uXoNLg" > </Video>
            </div> */}
        </div>
    )
}







// export function VideoGame(src) {
//     return (
//         <div>
//             <div className="game-video container ">
//                 <video className="container " controls autoPlay={false}>
//                     <source type="video/mp4" src="https://res.cloudinary.com/dfdvfunfj/video/upload/v1579773488/m5hjco0y2owps1svf1c3.mp4?#t=0&#autoplay=1&mute=1" />
//                 </video>
//             </div>
//         </div>
//     )
// }