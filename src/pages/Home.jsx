import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader } from '../cmps/Loader.jsx'
import { Link } from 'react-router-dom'
import { HomeGameList } from '../cmps/HomeGameList.jsx'
import { loadGames } from '../store/actions/game.actions'
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
      <div>
        {/* <HomeCtgList/> */}
        <div className="home-ctg">
          <h2>Browse game keys</h2>
          <div className="ctg-list">
            <Link to="game/new_releases" >New Releases </Link>
            <Link to="game/free_game" >Free Games</Link>
            <Link to="game/top_sellers" >Top Sellers</Link>
            <Link to="game/top_rated" >Top Rated</Link>
          </div>
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
