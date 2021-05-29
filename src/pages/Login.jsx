import React, { Component } from 'react'
import { connect } from 'react-redux'

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
      this.props.login(userCreds)
      this.setState({ loginCred: { username: '', password: '' } })
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
    if (this.props.loggedInUser) this.props.history.push(`/`)
    let signupSection = (
      <form className="flex space-around align-center" onSubmit={this.doSignup}>
        <h1>Signup</h1>
        <input
          type="text"
          name="fullname"
          value={this.state.signupCred.fullname}
          onChange={this.signupHandleChange}
          placeholder="Full name"
          autoComplete="fullname"
        />

        <input
          type="text"
          name="username"
          value={this.state.signupCred.username}
          onChange={this.signupHandleChange}
          placeholder="Username"
          autoComplete="username"
        />
        <input
          name="password"
          type="password"
          value={this.state.signupCred.password}
          onChange={this.signupHandleChange}
          placeholder="Password"
          autoComplete="current-password"
        />
        <button>Signup</button>
      </form>
    )
    let loginSection = (
      <form className="flex space-around align-center"  onSubmit={this.doLogin}>
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          value={this.state.loginCred.username}
          onChange={this.loginHandleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={this.state.loginCred.password}
          onChange={this.loginHandleChange}
          placeholder="Password"
        />
        <button>Login</button>
        <button
          onClick={this.toggleLoginSignup}
        >Signup</button>
      </form>
    )

    const { isLogIn } = this.state
    return (
      <div className="login flex column">
          <button
          variant="contained"
          color="primary"
          size="small"
          onClick={this.toggleLoginSignup}
        >&#129044;</button>
        {isLogIn && loginSection}
        {!isLogIn && signupSection}

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
