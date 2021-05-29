import { render } from "@testing-library/react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../Loader";

// export function MainGamePreview({ games }) {
export class MainGamePreview extends Component {
    state = {
        games: null,
        gameIdx: 0,
        imgIdx: 0
    }
    componentDidMount() {
        const games = this.props.games
        this.setState({ games })
    }
    changeGame = () => {

    }

    render() {
        const { games, gameIdx, imgIdx } = this.state
        if (!games || !games.length) return (<Loader />)
        const game = games[gameIdx]
        const img2 = require(`../../assets/img/${game.imgs.largeImgUrls[0]}`).default
        // const img2 = require(`../../assets/img/ratchet.jpg`).default
        const releasedAt = this.props.utilService.getDateFormat(game.releasedAt)
        const finalPrice = game.price - (game.price / game.discount)
        return (
            <div className="main-game-preview container mb-20">
                <button className="btn btn-prev">&#10094;</button>
                <Link to={`/game/${game._id}`}>

                    <div className="preview-container flex column">
                        <div className="m-img" >
                            <img src={img2} alt="" />
                        </div>
                        {/* <div className="flex"> */}

                        <div className="imgs-container flex column">
                            <img src={img2} alt="" />
                            <img src={img2} alt="" />
                            <h2>{game.title}</h2>
                            <p>Release date:{releasedAt}</p>
                        </div>

                        <div className="imgs-container flex column">
                            <img src={img2} alt="" />
                            <img src={img2} alt="" />
                            <div className="preview-price">
                                <p className="discount">{game.discount}%</p>
                                <div className="flex column">
                                    <p className="in-sale" >${game.price}</p>
                                    <p className="f-price" >${finalPrice.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                <button className=" btn btn-next"> &#10095;</button>
            </div>
        )
    }
}
