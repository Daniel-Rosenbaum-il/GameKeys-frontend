import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader } from '../cmps/Loader.jsx'
import { Link } from 'react-router-dom'
import { HomeGameList } from '../cmps/HomeGameList.jsx'
import { loadGames } from '../store/actions/game.actions'
import { CtgList } from '../cmps/CtgList.jsx'
class _Home extends Component {
  state = {

  }
  componentDidMount() {
    this.props.loadGames()
    // this.props.loadUsers()
    // service.query(filter)
  }

  render() {
    const { games } = this.props

    if (!games.length) console.log(games);
    if (!games) return <Loader />
    // console.log(games);
    return (
      <div className="home-page ">
        <div className="home-ctg mb-20">
        </div>
        <HomeGameList games={games} />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    isLoading: state.systemModule.isLoading,
    games: state.gameModule.games,
    // loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
  loadGames,
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)
