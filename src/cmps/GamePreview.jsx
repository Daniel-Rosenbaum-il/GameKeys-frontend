import { Link } from 'react-router-dom'
import { utilService } from '../services/util.service'

export function GamePreview({ game }) {
    const previewImg = require(`../assets/img/${game.imgs.largeImgUrls[0]}`).default
    const finalPrice = game.price - (game.price / game.discount)
    const rating = utilService.renderStars(game.rating)
    return (
            <Link to={`/game/${game._id}`}>
                <div className="game-card ">

                    <div className="card-img-preview">
                        <img src={previewImg} alt="game-preview-img" className="img-preview"></img>
                    </div>
                    <div className="game-info">
                        <div className="game-top-info">
                            <div className="rating flex space-between">
                                <p>{rating} {`(${game.reviews.length})`}</p>
                                <p>{rating.length > 4 ? `Top-Rated` : ''}</p>
                            </div>
                            <h2>{game.title}</h2>
                            <p className="small-description">{game.sDescription}</p>
                        </div>

                        <div className={`game-btm-info ${game.discount>0? "" : "mb-1rem"}`}>
                            <h4>{game.tags.map((tag, idx) => <span className="preview-tag" key={idx}>{tag}  </span>).slice(0, 3)}</h4>
                            <p className="discount">{game.discount? `${game.discount}$` : ''}</p>
                            <div className="flex column">
                                <p className={(game.discount>0)? "in-sale":'f-price'} >${game.price.toFixed(2)}</p>
                                {game.discount ? <p className="f-price" >${finalPrice.toFixed(2)}</p> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
    )
}