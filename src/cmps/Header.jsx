import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class _Header extends Component {
    render() {
        const {loggedInUser} = this.props;
        return <header className="main-header">
               <Link to="/"> <h1>GameKeys</h1></Link>
            <nav>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/game">Explore</NavLink>
                <NavLink exact to="/about">About us</NavLink>
                {/* <NavLink to="/chat">Chat Room</NavLink> */}
            </nav>
        </header>
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {}


export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)