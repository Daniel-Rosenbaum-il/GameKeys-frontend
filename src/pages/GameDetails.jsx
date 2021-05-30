import { Component } from 'react'
import { connect } from 'react-redux'

import { Video } from '../cmps/video'
import { gameService } from '../services/game.service'
import { removeGame } from '../store/actions/game.actions'
import { Loader } from '../cmps/Loader'
import { AddReview } from '../cmps/AddReview'
import { Link } from 'react-router-dom'
import { ReviewList } from '../cmps/ReviewList'


class _GameDetails extends Component {
    state = {
        game: null
    }
    async componentDidMount() {
        const game = await gameService.getById(this.props.match.params.gameId)
        this.setState({ game })
    }
    async onRemoveGame(gameId) {
        await this.props.removeGame(gameId)
        this.props.history.push('/Game/')
    }

    render() {
        const { game } = this.state
        if (!game) return <Loader />
        const gameImg = require(`../assets/img/${game.imgs.largeImgUrls[0]}`).default
        console.log(game);
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


                <div className="details-container flex mb-20">

                    <div className="video-container">
                        <div className="video">
                            <Video id={game.videoUrls[0]} />
                            {/* <img  src={gameImg} alt="" /> */}
                            <a>View more photos</a>
                        </div>
                        <div className="flex img-container justify-center">
                            
                            <div>
                        <img  src={gameImg} alt="" />
                            </div>
                            <div>
                        <img  src={gameImg} alt="" />
                            </div>
                            <div>
                        <img  src={gameImg} alt="" />
                            </div>
                            <div>
                        <img  src={gameImg} alt="" />
                            </div>
                        {/* <img  src={gameImg} alt="" />
                        <img  src={gameImg} alt="" />
                        <img  src={gameImg} alt="" /> */}
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
                            <Link to={`/game/${game.tags[0]}`} >{game.tags[0]} </Link>
                            <Link to={`/game/${game.tags[1]}`} >{game.tags[1]} </Link>
                            <Link to={`/game/${game.tags[2]}`} >{game.tags[2]} </Link>
                            <Link to={`/game/${game.tags[3]}`} >{game.tags[3]} </Link>
                        </div>
                        {/* <h2>${game.price}</h2> */}
                        <button onClick={() => this.onRemoveGame(game._id)}>Delete</button>
                    </div>
                </div>
                <div className="add-review">
                    <AddReview loggedInUser={this.props.loggedInUser} />
                </div>
                <div className="reviews-container">
                    <ReviewList reviews={game.reviews} loggedInUser={this.props.loggedInUser}/>
                </div>
            </section>
        )
    }

}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser

    }
}
const mapDispatchToProps = {
    removeGame,
}
export const GameDetails = connect(mapStateToProps, mapDispatchToProps)(_GameDetails)
