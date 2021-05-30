import { Link } from 'react-router-dom'
export function SmallGamePreview({ game }) {
    const gameImg = require(`../../assets/img/${game.imgs.largeImgUrls[0]}`).default
    const finalPrice = game.price - (game.price / game.discount)
    return (
        <div className="small-game-preview space-between">
            <div>
                <Link to={`/game/${game._id}`} >
                    <div className="s-img">
                        <img src={gameImg} alt="" />
                    </div>
                    <div className="preview-price">
                        <p className="discount">{game.discount}%</p>
                        <div className="flex column">
                            <p className="in-sale" >${game.price.toFixed(2)}</p>
                            <p className="f-price" >${finalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

