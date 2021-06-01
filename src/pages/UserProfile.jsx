import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadGames } from '../store/actions/game.actions'


class _UserProfile extends Component {

    componentDidMount() {
        this.props.loadGames()
    }
    render() {
        const { games, loggedInUser } = this.props
        const userImg = require(`../assets/img/${loggedInUser.imgUrl}`).default
        return (
            <section className="main-user-profile container">
                <div className="user-profile-header">
                    <img src={userImg} alt=""></img>
                <h1>Hello {loggedInUser.fullname}</h1>
                </div>
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
export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile)