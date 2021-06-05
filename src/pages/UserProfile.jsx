import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loadGames } from '../store/actions/game.actions'
import { UserHeader } from '../cmps/UserCmps/UserHeader'
import { UserGameList } from '../cmps/UserCmps/UserGameList'
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
        // await this.props.loadGames()
    }

    componentDidUpdate(prevProps, prevState) {
        const { loggedInUser } = this.props
        const { user } = this.state
        if (prevProps.loggedInUser !== loggedInUser) {
            if (!loggedInUser) this.props.history.push(`/`)
            // if (!user) this.props.history.push(`/`)
        }
    }

    render() {
        const { loggedInUser } = this.props
        const { user } = this.state
        // const userImg = require(`../assets/img/${loggedInUser.imgUrl}`).default
        if (!loggedInUser) return <h1>No user to show</h1>
        console.log(user);
        if (!user) return <h1>Loading</h1>
        return (
            <section className="main-user-profile">
                <UserHeader fullname={user.fullname} img={user.imgUrl} />
                <div className="user-bought-list container">
                    <h1>Games you bought</h1>
                    <UserGameList orders={user.orders} />
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