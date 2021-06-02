import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  loadUsers,
  removeUser,
  login,
  logout,
  signup
} from '../store/actions/user.actions'

class _Login extends Component {
  state = {
    msg: '',
    loginCred: {
      username: '',
      password: ''
    },
    signupCred: {
      username: '',
      password: '',
      fullname: ''
    },
    isLogIn: true
  }

  componentDidMount() {
    // this.props.loadUsers()
  }

  loginHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }))
  }

  signupHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }))
  }

  doLogin = async ev => {
    ev.preventDefault()
    const { username, password } = this.state.loginCred
    if (!username) {
      return this.setState({ msg: 'Please enter user/password' })
    }
    const userCreds = { username, password }
    try {
      await this.props.login(userCreds)
      this.props.history.push(`/`)
    } catch (err) {
      this.setState({ msg: 'Login failed, try again.' })
    }
  }

  doSignup = async ev => {
    ev.preventDefault()
    const { username, password, fullname } = this.state.signupCred
    if (!username || !password || !fullname) {
      return this.setState({ msg: 'All inputs are required' })
    }
    const signupCreds = { username, password, fullname }
    this.props.signup(signupCreds)
    this.setState({ signupCred: { username: '', password: '', fullname: '' } })
  }
  toggleLoginSignup = () => {
    const { isLogIn } = this.state
    this.setState({ isLogIn: !isLogIn })
  }
  removeUser = userId => {
    this.props.removeUser(userId)
  }
  render() {
    if (this.props.loggedInUser) return null
    let signupSection = (
      <div className="login-container">
        <form className="flex space-around align-center column" onSubmit={this.doSignup}>
          <h1>Signup</h1>
          <label className="flex column" >Full name
          <input
              type="text"
              name="fullname"
              value={this.state.signupCred.fullname}
              onChange={this.signupHandleChange}
              // placeholder="Full name"
              autoComplete="fullname"
            />
          </label>

          <label className="flex column" >Username
        <input
              type="text"
              name="username"
              value={this.state.signupCred.username}
              onChange={this.signupHandleChange}
              // placeholder="Username"
              autoComplete="username"
            />
          </label>
          <label className="flex column  " >Password
        <input
              className="mb-20"
              name="password"
              type="password"
              value={this.state.signupCred.password}
              onChange={this.signupHandleChange}
              // placeholder="Password"
              autoComplete="current-password"
            />
            <button className="btn-join">Signup</button>
          </label>
        </form>
      </div>
    )
    let loginSection = (
      <div className="login-container">
        <form className="flex space-around align-center column" onSubmit={this.doLogin}>
          <p className="login-title"> SIGN IN</p>
          <label className="flex column" >Game keys account name
          <input
              type="text"
              name="username"
              value={this.state.loginCred.username}
              onChange={this.loginHandleChange}
            // placeholder="Username"
            />
          </label>

          <label className="flex column" >Password
          <input
              type="password"
              name="password"
              value={this.state.loginCred.password}
              onChange={this.loginHandleChange}
            // placeholder="Password"
            />
          </label>
          <button className="btn-login mb-20 " >Sign in</button>
          <a >Forgot your password?</a>
        </form>
      </div>
    )

    const { isLogIn } = this.state
    const joinImg = require('../assets/img/join.png').default
    return (
      <div className="login space-around align-center flex container mb-20">
        <div className="flex">

          {/* <button
            variant="contained"
            color="primary"
            size="small"
            onClick={this.toggleLoginSignup}
          >&#129044;</button> */}
          
          {isLogIn && loginSection}
          {!isLogIn && signupSection}
        </div>
        {!isLogIn && <button className="btn-join"
          onClick={this.toggleLoginSignup}
        >Back to login</button>}

        {isLogIn && <div className="join-container flex column align-center justify-center space-around">
          <div className="flex column space-between align-center">
            <p>Join Game keys and discover thousands of games to play.</p>
            <Link to="/about" >Learn more</Link>
          </div>
          {/* <img src={joinImg} alt="" /> */}
          <div className="flex justify-center column">
            <p>It's <span>free</span> and <span>easy</span>  to use.</p>
            <button className="btn-join"
              onClick={this.toggleLoginSignup}
            >Join Game keys</button>
          </div>

        </div>}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
    // isLoading: state.systemModule.isLoading
  }
}
const mapDispatchToProps = {
  login,
  logout,
  signup,
  removeUser,
  loadUsers
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)
