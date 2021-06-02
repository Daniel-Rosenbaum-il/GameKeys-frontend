import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from "../store/actions/user.actions"
class _Header extends Component {
    flexClass = 'flex space-around space-between align-center'
    render() {
        const { loggedInUser } = this.props;
        return <header className={`main-header mb-20`}>
            <div className={`container ${this.flexClass}`}>

                {/* <Link to="/"> <p className="logo">GameKeys</p></Link> */}
                <Link to="/"><p className="logo mb-20">G<span>a</span><span>m</span><span>e</span> keys</p></Link>
                <nav className={this.flexClass}>
                    <NavLink exact to="/">Home</NavLink>
                    <NavLink to="/game">Explore</NavLink>
                    <NavLink exact to="/about">About us</NavLink>
                    {!loggedInUser && <Link className="btn-login" to="/login">Login</Link>}
                    {loggedInUser && <div className="user-header">
                        <p>Hi {loggedInUser.fullname}</p>
                        <button onClick={this.props.logout}>Logout</button>
                        <Link to="/profile">Profile</Link>
                    </div>}
                    {/* <NavLink to="/chat">Chat Room</NavLink> */}
                </nav>
            </div>
        </header>
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    logout,
}


export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)