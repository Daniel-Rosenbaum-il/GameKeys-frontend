import React, { Component } from 'react'

import { connect } from 'react-redux'

import { loadGames } from '../store/actions/game.actions'
import { UserHeader } from '../cmps/UserCmps/UserHeader'


class _UserProfile extends Component {

    componentDidMount() {
        this.props.loadGames()
    }
    render() {
        const { games, loggedInUser } = this.props
        // console.log(loggedInUser);
        // const userImg = require(`../assets/img/${loggedInUser.imgUrl}`).default

        return (
            <section className="main-user-profile">
                <UserHeader fullname={loggedInUser.fullname} />


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