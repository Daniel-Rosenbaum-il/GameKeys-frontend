import { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { Home } from './pages/Home'
import { Login } from './pages/Login'
// import { UserDetails } from './src/pages/UserDetails'

import { Header } from './cmps/Header'
import { GameApp } from './pages/GameApp'
import { GameDetails } from './pages/GameDetails'
import { About } from './pages/About'
import { userMsg } from './store/actions/user.actions'

import { Footer } from './cmps/Footer'
import { GameCart } from './pages/GameCart'
import { UserProfile } from './pages/UserProfile'
import { socketService } from './services/socket.service'

class _App extends Component {
  state = {
    msg: ''
  }

  componentDidMount() {
    socketService.setup()
    socketService.on('gameBought', this.onGameBought)
    this.setState({ msg: this.props.msg })
  }
  componentWillUnmount() {
    socketService.terminate()
  }

  onGameBought = async (order) => {
    // console.log("game")
    await this.props.userMsg('An order has been made' )
    this.setState({ msg: this.props.msg})
    setTimeout(() => {
      this.props.userMsg('')
    }, 2000);
    this.setState({ msg: this.props.msg})
    // this.onSetMsg("An order has been made" )
  }
  
  render() {
    console.log('App', this.props.msg);
    return (
      <div className="app">
        <Router>
          <Header msg={this.props.msg}></Header>
          <main className="">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/profile" component={UserProfile} />
              <Route path="/game/order/:gameId" component={GameCart} />
              <Route path="/game/:gameId" component={GameDetails} />
              <Route path="/game" component={GameApp} />
              <Route path="/about" component={About} />
              <Route path="/" component={Home} />
            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    msg: state.userModule.msg
  }
}
const mapDispatchToProps = {
  userMsg,
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
