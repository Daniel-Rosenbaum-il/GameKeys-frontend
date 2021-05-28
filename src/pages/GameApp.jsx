import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gameService } from '../services/game.service'
import { loadGames } from '../store/actions/game.actions'
import { GameList } from '../cmps/GameList'
import { GameFilter } from '../cmps/GameFilter'

class _GameApp extends Component {

    componentDidMount() {
        this.props.loadGames()
    }
    onSetFilter = (filterBy) => {
        this.props.loadGames(filterBy)
    }

    render() {
        console.log(this.props.games);
        const { games } = this.props
        return (
            <section className="main-explorer">
                <GameFilter  onSetFilter={this.onSetFilter}/>
                <GameList games={games} />
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