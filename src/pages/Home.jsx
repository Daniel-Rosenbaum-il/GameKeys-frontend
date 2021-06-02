import { Component } from 'react'
import { connect } from 'react-redux'
import { Loader } from '../cmps/UtilCmps/Loader'
import { DynamicCmp } from '../cmps/DynamicCmp.jsx'
import { loadGames } from '../store/actions/game.actions'
import { utilService } from '../services/util.service'

class _Home extends Component {
  state = {

  }
  componentDidMount() {
    this.props.loadGames()
    // this.props.loadUsers()
    // service.query(filter)
  }

  render() {
    const { games } = this.props // Do we need main here??
    if (!games) return <Loader />
    // console.log(games);
    return (
      <div className="home-page">
        <div className="home-ctg mb-20">
        </div>
        <DynamicCmp games={games} utilService={utilService} type={'main'} />
        <DynamicCmp games={games} type={'small'} />
        {/* <DynamicCmp src={''} type={'video'} /> */}

        {/* <div className="game-video container ">
          <video className="container " controls autoPlay={false}>
            <source type="video/mp4" src="https://res.cloudinary.com/dfdvfunfj/video/upload/v1579773488/m5hjco0y2owps1svf1c3.mp4?#t=0&#autoplay=1&mute=1" />
          </video>
        </div> */}
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
