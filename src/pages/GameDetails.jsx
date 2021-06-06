import { Component } from 'react'
import { connect } from 'react-redux'

import { gameService } from '../services/game.service'
import { removeGame, saveGame, addReview } from '../store/actions/game.actions'
import { loadUsers, userMsg } from '../store/actions/user.actions'
import { Loader } from '../cmps/UtilCmps/Loader'
import { AddReview } from '../cmps/ReviewCmps/AddReview'
import { Link } from 'react-router-dom'
import { ReviewList } from '../cmps/ReviewCmps/ReviewList'
import { utilService } from '../services/util.service'
import { orderService } from '../services/order.service'
import { DetailsSideBar } from '../cmps/GameDetailsCmps/DetailsSideBar'
import { DetailsPriceBar } from '../cmps/GameDetailsCmps/DetailsPriceBar'
import { DetailsPanel } from '../cmps/GameDetailsCmps/DetailsPanel'
import { DetailsTopNav } from '../cmps/GameDetailsCmps/DetailsTopNav'


class _GameDetails extends Component {
    state = {
        game: null,
        isInLibrary: false
    }
    async componentDidMount() {
        this.loadGame()
        if (this.props.loggedInUser) this.checkIsInLibrary()
        this.props.loadUsers()
    }
    async loadGame() {
        const game = await gameService.getById(this.props.match.params.gameId)
        this.setState({ game })
    }
    async checkIsInLibrary() {
        const gameId = this.state.game._id
        const userId = this.props.loggedInUser._id
        const isInLibrary = await orderService.checkIsInLibrary(gameId, userId)
        this.setState({ isInLibrary })
    }

    onRemoveGame = async (gameId) => {
        await this.props.removeGame(gameId)
        this.props.history.push('/Game/')
    }
    onAddReview = async (review) => {
        let { game } = this.state
        await this.props.addReview(review, game._id, this.props.loggedInUser)
        this.loadGame()
        this.setState({ game })
    }

    getDesc() {
        if (this.state.game) {
            const { description } = this.state.game
            const descriptions = description.split('.');
            let shortStr = ''
            let length = 3
            let newDescs = []
            descriptions.forEach((desc, idx) => {
                shortStr += desc +'. '
                if (idx === length) {
                    length += 3
                    newDescs.push(shortStr)
                    shortStr = ''
                }
            })
            return newDescs
        }
    }
    render() {
        const { users, loggedInUser } = this.props
        const { game, isInLibrary } = this.state
        if (!game) return <Loader />
        const finalPrice = utilService.getFinalPrice(game.price, game.discount)
        const descriptions = this.getDesc()
        return (
            <section className="main-details container">
                <DetailsTopNav game={game} />
                <h1>{game.title}</h1>
                <DetailsPanel game={game} getDateString={utilService.getDateString} />

                <div className="wishlist-link">
                    {loggedInUser && !isInLibrary && <button className="btn-secondary btn btn-lg" >Add to wishList</button>}
                    {!loggedInUser && <p><Link to={'/login'}>Sign in</Link> to add this item to your wishlist, follow it, or mark it as ignored</p>}
                </div>

                <div className="buy-container flex column gap-10">
                    <DetailsPriceBar isInLibrary={isInLibrary} game={game} finalPrice={finalPrice} />
                    <DetailsSideBar loggedInUser={loggedInUser} isInLibrary={isInLibrary} />
                </div>

                <div className="flex mb-20">

                    <div className="desc" >
                        <p className="title" >ABOUT THIS GAME</p>
                        {/* {descriptions.map(desc => <p className="desc" >{(desc)}</p>)} */}
                        {descriptions.map(desc => {
                            return (
                                <><p>{desc}</p>
                                    <br />
                                </>
                            )
                        })}
                    </div>

                </div>
                <div className="add-review">
                    <AddReview loggedInUser={loggedInUser} onAddReview={this.onAddReview} userMsg={this.props.userMsg} />
                </div>
                <div className="reviews-container">
                    <ReviewList reviews={game.reviews} users={users} loggedInUser={loggedInUser} />
                </div>
            </section >
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
    addReview,
    userMsg,
}
export const GameDetails = connect(mapStateToProps, mapDispatchToProps)(_GameDetails)
