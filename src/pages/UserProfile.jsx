import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loadGames } from '../store/actions/game.actions'
import { UserHeader } from '../cmps/UserCmps/UserHeader'
import { UserGameList } from '../cmps/UserCmps/UserGameList'
import { DanDUserGameList } from '../cmps/UserCmps/DanDUserGameList'
import { userService } from '../services/user.service'
import { Chart } from '../cmps/UtilCmps/Chart'

class _UserProfile extends Component {
    state = {
        user: null,
        serialKey: '',
        gamesToSell: null
    }
    componentDidMount = async () => {
        const { loggedInUser } = this.props
        if (!loggedInUser) return this.props.history.push(`/`)
        const user = await userService.getById(loggedInUser._id)
        this.setState({ user })
        await this.props.loadGames()
        const games = this.props.games
        const gamesToSell = games.filter(game => game.seller._id === loggedInUser._id)
        this.setState({ gamesToSell })
    }

    componentDidUpdate(prevProps, prevState) {
        const { loggedInUser } = this.props
        const { user } = this.state
        if (prevProps.loggedInUser !== loggedInUser) {
            if (!loggedInUser) this.props.history.push(`/`)
            // if (!user) this.props.history.push(`/`)
        }
    }
    onGameClicked = (serialKey) => {
        this.setState({ serialKey: serialKey })
    }
    render() {
        const { loggedInUser } = this.props
        const { user, serialKey, gamesToSell } = this.state
        if (!loggedInUser) return <h1>No user to show</h1>
        console.log(gamesToSell);
        if (!user) return <h1>Loading</h1>
        if (!gamesToSell) return <h1>Loading</h1>
        return (
            <section className="main-user-profile">
                <UserHeader fullname={user.fullname} img={user.imgUrl} />
                <div className="user-bought-list container">
                    <h1>Games you bought</h1>
                    {/* <UserGameList orders={user.orders} /> */}
                    <DanDUserGameList orders={user.orders} onGameClicked={this.onGameClicked} />
                </div>
                <div className="user-sell-container container">
                    <h1>Games you sell</h1>
                    <div className="user-sell-list">
                        {gamesToSell.map(game => <div className="user-sell-preview" key={game._id}>
                            <div className="user-sell-card">
                                <div className="user-sell-img">
                                    <img src={require(`../assets/img/${game.imgs.largeImgUrls[0]}`).default}></img>
                                </div>
                                <div className="user-sell-info">
                                    <h2>{game.title}</h2>
                                    <h2>Sell price: ${game.price}</h2>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
                <div className="main-chart container">
                    <h1>Statistics</h1>
                    <div className="chart-preview">
                        <Chart type="bar" 
                        labels={['January','February','March','April','May','June']}
                            label='Amout made in $'
                            datas={[280.00,450.00,387.97,258.95,370.00,35.00]}
                        />
                        <Chart type="bar" 
                        labels={['January','February','March','April','May','June']}
                            label='Play time: in hours-monthly'
                            datas={[72,35,112,28,56,10]}
                        />
                    </div>
                </div>
                {serialKey && <div className="game-clicked-info">
                    <h1>Your serial-key: {serialKey}</h1>
                    <p>Add your key to your favorite app</p>
                    <p>We advise to use GameKeys app! but we work with</p>
                    <p>Steam, Google play and HBO-Games</p>
                    <p>Enjoy</p>
                    <botton className="game-user-btn" onClick={() => this.onGameClicked('')}>GG</botton>
                </div>}
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