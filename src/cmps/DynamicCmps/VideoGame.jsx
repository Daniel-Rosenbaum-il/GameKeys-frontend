
export function VideoGame(src) {
    return (
        <div className="game-video container ">
            <video className="container " controls autoPlay={false}>
                <source type="video/mp4" src="https://res.cloudinary.com/dfdvfunfj/video/upload/v1579773488/m5hjco0y2owps1svf1c3.mp4?#t=0&#autoplay=1&mute=1" />
            </video>
        </div>
    )
}