import { Component } from 'react'
import { connect } from 'react-redux'

import { Video } from '../cmps/video'
import { gameService } from '../services/game.service'
import { removeGame } from '../store/actions/game.actions'
import { Loader } from '../cmps/Loader'
import { AddReview } from '../cmps/AddReview'


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
        if (!game) return <Loader/>
        console.log(game);
        return (
            <section className="main-details">
                <div className="details-container">
                    <div className="video-container">
                        <Video id={game.videoUrls[0]} />
                    </div>
                    <div className="details-info">
                        <h1>{game.title}</h1>
                        <h2 maxLength="5">{game.description}</h2>
                        <h2>${game.price}</h2>
                        <button onClick={()=>this.onRemoveGame(game._id)}>Delete</button>
                    </div>
                </div>
                <div className="add-review">
                <AddReview loggedInUser={this.props.loggedInUser}/>
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
