import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gameService } from '../services/game.service'
import { loadGames } from '../store/actions/game.actions'
import { GameList } from '../cmps/GameList'

class _GameApp extends Component {

    componentDidMount() {
        {
            this.props.loadGames()
        }
    }

    render() {
        console.log(this.props.games);
        const {games} = this.props
        return (
            <section className="main-explorer">
                <h2>Explorer</h2>
                <GameList games={games}/>
            </section>
        )
    }
}
const mapStateToProps = state => {
    return {
        isLoading: state.systemModule.isLoading,
        games: state.gameModule.games,
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    loadGames,
}

export const GameApp = connect(mapStateToProps, mapDispatchToProps)(_GameApp)