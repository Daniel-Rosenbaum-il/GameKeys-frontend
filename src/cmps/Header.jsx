import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from "../store/actions/user.actions"
import { Screen } from "./UtilCmps/Screen"
import NotifyMe from 'react-notification-timeline';
import { UserMsg } from './UtilCmps/UserMsg'
class _Header extends Component {
    state = {
        isHidden: true,
        data: []
    }
    // componentDidMount() {
    //     if (this.props.msg) {
    //         this.updateData(this.props.msg)
    //     }
    // }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.msg){
            if(prevProps.msg === "You got a gift!!!")
            this.updateData(prevProps.msg);
        }
    }
    
    updateData(msg) {
        const data =
        {
            "update": msg,
            "timestamp": Date.now()
        }
        this.setState({ data: [...this.state.data, data] })
        
    }
    
    toggleIsHidden = () => {
        const { isHidden } = this.state
        this.setState({ isHidden: !isHidden })
    }
    
    readAll = () => {
        this.setState({data:[]});
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
        const {data} = this.state
        const logo = "https://res.cloudinary.com/dat4toc2t/image/upload/v1623183631/GameKeys/img/logo/GameKeys-BIG_k1kusx.png"
        const { loggedInUser } = this.props;
        return <header className={`main-header`}>
            {this.props.msg && <UserMsg msg={this.props.msg} />}
            <div className={`container ${this.flexClass}`}>
                {/* {this.props.msg && <div className="user-msg"></div>} */}
                <Link to="/"><img src={logo} className="logo-img" alt=""></img></Link>

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
                                data={data}
                                storageKey='notific_key'
                                notific_key='timestamp'
                                notific_value='update'
                                heading='Notification Alerts'
                                sortedByKey={false}
                                showDate={true}
                                size={18}
                                color="#b9e4fd"
                                markAsReadFn={() => this.readAll()}
                            />
                            <img onClick={() => this.toggleIsHidden()} src={loggedInUser.imgUrl} alt="" />
                        </div>

                        <div onClick={() => this.toggleIsHidden()} className={`user-menu ${this.state.isHidden && 'hidden-menu'}`}>
                            <div className="drop-down">
                                <Link to="/profile">Profile</Link>
                                {loggedInUser && <a onClick={this.props.logout}>Logout:
                             <span className="light-txt txt-cap"> {loggedInUser.username}</span></a>}
                                <a>Wishlist</a>
                                <a>My store</a>
                                <Link to="/profile/edit">Edit profile</Link>
                            </div>
                        </div>
                    </div>}
                </nav>

                <div onClick={() => this.toggleIsHidden()}
                    className={`screen ${this.state.isHidden && 'hidden-screen'}`} >
                </div>
                <button className="btn-menu " onClick={() => this.toggleIsHidden()}>☰</button>
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