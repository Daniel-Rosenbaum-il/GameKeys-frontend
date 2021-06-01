import { Component } from 'react'
import { connect } from 'react-redux'

import { Video } from '../cmps/video'
import { gameService } from '../services/game.service'
import { removeGame, saveGame } from '../store/actions/game.actions'
import { loadUsers } from '../store/actions/user.actions'
import { Loader } from '../cmps/Loader'
import { AddReview } from '../cmps/AddReview'
import { Link } from 'react-router-dom'
import { ReviewList } from '../cmps/ReviewList'


class _GameDetails extends Component {
    state = {
        game: null,
    }
    async componentDidMount() {
        const game = await gameService.getById(this.props.match.params.gameId)
        this.setState({ game })
        this.props.loadUsers()
    }
    async onRemoveGame(gameId) {
        await this.props.removeGame(gameId)
        this.props.history.push('/Game/')
    }
    onAddReview = (review) => {
        let { game } = this.state
        const newRating = !game.reviews.length ? game.rating + review.rate :
        game.rating * game.reviews.length + review.rate
        game.rating = newRating / (game.reviews.length + 1)
        game.reviews.push(review)
        this.saveReview(game)
    }
    async saveReview(game) {
        await this.props.saveGame(game)
        this.setState({ game })
    }
    render() {
        const { users, loggedInUser } = this.props
        const { game } = this.state
        if (!game) return <Loader />
        const gameImg = require(`../assets/img/${game.imgs.largeImgUrls[0]}`).default
        const finalPrice = game.price - (game.price / game.discount)
        return (
            <section className="main-details container">
                {/* <p>All Games > Strategy Games > {game.tags[0]}</p> */}
                <p>
                    <Link to={`/game`} >All Games  </Link> {'>'}
                    <Link to={`/game/${game.tags[0]}`} >{game.tags[0] + '> '}  </Link>
                    <Link to={`/game/${game.title}`} >{game.title}</Link>
                    {/* <Link className="" to={`game/${game.title`}>{game.title}</Link> */}
                </p>
                <h1>{game.title}</h1>

                <div className="details-container flex gap-20">
                    <div className="video-container">
                        <div className="video flex column gap-10 justify-center">
                            <Video url={game.videoUrls[0]} />
                            {/* <a>View more photos</a> */}
                            {/* </div> */}
                            <div className="flex img-container gap-10">
                                <div>
                                    <img src={gameImg} alt="" />
                                </div>
                                <div>
                                    <img src={gameImg} alt="" />
                                </div>
                                <div>
                                    <img src={gameImg} alt="" />
                                </div>
                                <div>
                                    <img src={gameImg} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="details-info">
                        <img className="mb-10" src={gameImg} alt="" />
                        <p maxLength="5">{game.description}</p>
                        <div className="flex">
                            <p className="dark-txt">RELEASE DATE: </p>
                            <p className="light-txt">29 Apr, 2021{game.releaseAt}</p>
                        </div>
                        <div className="flex">
                            <p className="dark-txt">DEVELOPER:</p>
                            <p className="light-txt">Creative Assembly, Feral Interactive</p>
                        </div>
                        <div className="flex">
                            <p className="dark-txt"> PUBLISHER:</p>
                            <p className="light-txt"> SEGA</p>
                        </div>
                        <p className="dark-txt"> Popular user-defined tags for this product:</p>
                        <div className="tag-container mb-20 flex space-evenly">
                            {/* <Link to={`/game/${game.tags[0]}`} >{game.tags[0]} </Link> */}
                            {game.tags.map((tag,idx) => <Link to={`/game?tag=${tag}`} key={idx}>{tag} </Link>).slice(0, 3)}
                        </div>
                        {/* <h2>${game.price}</h2> */}
                        {/* <button onClick={() => this.onRemoveGame(game._id)}>Delete</button> */}
                    </div>
                </div>
                <div className="wishlist-link">
                    <p><Link to={'/login'}>Sign in</Link> to add this item to your wishlist, follow it, or mark it as ignored</p>
                </div>

                <div className="buy-container flex column gap-10">
                    <div className="price-container container">
                        <div>
                            <h2>Buy {game.title}</h2>
                            <p>WEEKEND DEAL! Offer ends in <span> 29:06:12</span></p>
                        </div>
                        <div className="details-price">
                            <div className="price-info flex ">
                                <div>
                                    <p className="discount">{game.discount}%</p>

                                </div>
                                <div className="flex column space-evenly align-center justify-center mr-5">
                                    <p className="in-sale" >${game.price.toFixed(2)}</p>
                                    <p className="f-price" >${finalPrice.toFixed(2)}</p>
                                </div>
                                <Link to={`/game/order/${game._id}`} > <button >Add to cart</button></Link>
                            </div>
                        </div>
                    </div>

                    <div className="sign-in" >
                        <h2>
                            Is this game relevant to you?
                        </h2>
                        <p>Sign in to see reasons why you may or may not like this based on your games, friends, and curators you follow.</p>
                        <div>
                            <Link to="/login">Sign in</Link>
                        </div>
                    </div>

                </div>


                <div className="add-review">
                    <AddReview loggedInUser={loggedInUser} onAddReview={this.onAddReview} />
                </div>
                <div className="reviews-container">
                    <ReviewList reviews={game.reviews} users={users} loggedInUser={loggedInUser} />
                </div>
            </section>
        )
    }

}

const mapStateToProps = state => {
    return {
        users: state.userModule.users,
        loggedInUser: state.userModule.loggedInUser

    }
}
const mapDispatchToProps = {
    loadUsers,
    removeGame,
    saveGame,
}
export const GameDetails = connect(mapStateToProps, mapDispatchToProps)(_GameDetails)
