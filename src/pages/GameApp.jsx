import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gameService } from '../services/game.service'
import { loadGames } from '../store/actions/game.actions'

class _GameApp extends Component {

    componentDidMount() {
        {
            this.props.loadGames()
        }
    }

    render() {
        console.log(this.props.games);
        return (
            <section className="main-explorer">

                
            </section>
        )
    }
}
const mapStateToProps = state => {
    return {
        games: state.gameModule.games,
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    loadGames,
}

export const GameApp = connect(mapStateToProps, mapDispatchToProps)(_GameApp)