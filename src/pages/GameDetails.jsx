import { Component } from 'react'
import { Loader } from '../cmps/Loader'
import { gameService } from '../services/game.service'
import { Video } from '../cmps/video'

export class GameDetails extends Component {
    state = {
        game: null
    }
    async componentDidMount() {
        console.log(this.props.match.params.gameId);
        const game = await gameService.getById(this.props.match.params.gameId)
        this.setState({ game })
    }
    render() {
        const { game } = this.state
        if (!game) return <Loader></Loader>
        console.log(game);
        return (
            <section className="main-Details">
                <div className="details-container">
                    <div className="video-container">
                        <Video id={game.videoUrls[0]} />
                    </div>
                    <div className="details-info">
                        <h1>{game.title}</h1>
                        <h2>{game.description}</h2>
                        <h2>${game.price}</h2>
                    </div>
                </div>
            </section>
        )
    }

}
