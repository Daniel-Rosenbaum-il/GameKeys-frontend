import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from "../store/actions/user.actions"
import { Screen } from "./UtilCmps/Screen"
import NotifyMe from 'react-notification-timeline';
class _Header extends Component {
    state = {
        isHidden: true
    }
    toggleIsHidden = () => {
        const { isHidden } = this.state
        this.setState({ isHidden: !isHidden })
    }
    readMsg = (prop) => {
        console.log('read');
    }



    flexClass = 'flex space-around space-between align-center'

    onLogout = async () => {
        try {
            await this.props.logout()
        } catch (err) {
            console.log('err', err);
        }
    }
    render() {
        const img = require('../assets/img/user1.jpg').default
        const { loggedInUser } = this.props;
        return <header className={`main-header mb-20`}>
            <div className={`container ${this.flexClass}`}>
                {/* {this.props.msg && <div className="user-msg"></div>} */}
                <Link to="/"><p className="logo mb-20">G<span>a</span><span>m</span><span>e</span> keys</p></Link>

                <nav className={`${this.flexClass} ${!this.state.isHidden && 'show'}`}>
                    <div className="link-container" >
                        <NavLink exact to="/">Home</NavLink>
                        <NavLink to="/game">Explore</NavLink>
                        <NavLink exact to="/about">About us</NavLink>
                        {!loggedInUser && <Link className="btn-login" to="/login">Login</Link>}
                    </div>


                    {loggedInUser && <div className="user-header">

                        {/* </details> */}
                    </div>}

                    {/* <Screen isHidden={this.state.isHidden} toggleIsHidden={this.toggleIsHidden} /> */}
                    {loggedInUser && <div className="user-menu-container flex " >
                        <div className="flex  align-center" >
                            <NotifyMe
                                data={[
                                    {
                                        "update": "Product sold🛒",
                                        "timestamp": 1596119688264
                                    },
                                    {
                                        "update": "Product sold🛒",
                                        "timestamp": 1596119998264
                                    },
                                    {
                                        "update": "Product sold🛒",
                                        "timestamp": 1596119998264
                                    },
                                ]}
                                storageKey='notific_key'
                                notific_key='timestamp'
                                notific_value='update'
                                heading='Notification Alerts'
                                sortedByKey={false}
                                showDate={true}
                                size={18}
                                color="#b9e4fd"
                                markAsReadFn={() => this.readMsg()}
                            />
                            <img onClick={() => this.toggleIsHidden()} src={img} alt="" />
                        </div>

                        <div onClick={() => this.toggleIsHidden()} className={`user-menu ${this.state.isHidden && 'hidden-menu'}`}>
                            <div className="drop-down">
                                <Link to="/profile">Profile</Link>
                                {loggedInUser && <a onClick={this.props.logout}>Logout:
                             <span className="light-txt txt-cap"> {loggedInUser.username}</span></a>}
                                <a>Wishlist</a>
                                <a>My store</a>
                            </div>
                        </div>
                    </div>}
                </nav>

                <div onClick={() => this.toggleIsHidden()}
                    className={`screen ${this.state.isHidden && 'hidden-screen'}`} >
                </div>
                <button  class="btn-menu  hamburger" onClick={() => this.toggleIsHidden()}>☰</button>
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