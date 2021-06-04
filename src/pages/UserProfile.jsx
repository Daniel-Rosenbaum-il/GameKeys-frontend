import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loadGames } from '../store/actions/game.actions'
import { UserHeader } from '../cmps/UserCmps/UserHeader'
import { userService } from '../services/user.service'


class _UserProfile extends Component {
    state = {
        user: null
    }
    componentDidMount = async () => {
        const { loggedInUser } = this.props
        if (!loggedInUser) return this.props.history.push(`/`)
        const user = await userService.getById(loggedInUser._id)
        this.setState({ user })
        await this.props.loadGames()
    }

    componentDidUpdate(prevProps, prevState) {
        const { loggedInUser } = this.props
        if (prevProps.loggedInUser !== loggedInUser) {
            if (!loggedInUser) this.props.history.push(`/`)
        }
    }

    render() {
        const { games, loggedInUser } = this.props
        const { user } = this.state
        console.log(user);
        // const userImg = require(`../assets/img/${loggedInUser.imgUrl}`).default
        if (!loggedInUser) return <h1>No user to show</h1>
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