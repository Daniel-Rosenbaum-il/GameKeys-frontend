import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gameService } from '../services/game.service'
import { loadGames } from '../store/actions/game.actions'
import { GameList } from '../cmps/GameList'
import { GameFilter } from '../cmps/GameFilter'
import { GameCarousel } from '../cmps/UtilCmps/GameCarousel'

class _GameApp extends Component {

    componentDidMount() {
        const paramsString = this.props.location.search
        const searchParams = new URLSearchParams(paramsString).get('tag');
        console.log(searchParams);
        if (searchParams) {
            const filterBy = { tag: searchParams }
            this.props.loadGames(filterBy)
        }else{
            this.props.loadGames()
        }
    }
    onSetFilter = (filterBy) => {
        this.props.loadGames(filterBy)
    }

    render() {
        const { games } = this.props
        // const backgroundImg = require(`../assets/img/background-5.jpg`).default
        const backgroundImg = require(`../assets/img/hero2.jpeg`).default
        return (
            <section className="main-explorer">
                <img className="hero " src={backgroundImg} alt="" />
                <GameFilter onSetFilter={this.onSetFilter} />
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