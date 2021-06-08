import { Component } from 'react'
import { Link } from 'react-router-dom';

export class FriendsList extends Component {
    state = {
        friendId: null
    }

    onChoseFriend = (friendId) => {
        console.log(friendId);
        this.setState({ friendId })
    }

    render() {
        const { friendId } = this.state
        const { frinedsList, onCheckOut, toggleModal, isOpenModal } = this.props
        return (
            <div className="friends-modal flex column space-between">
                <div>
                    <h4>Chose from your friends list</h4>
                    {frinedsList.map(friend => {
                        return (
                            <div key={`friend${friend.friendId}`}>
                                <p className={`txt-cap ${(friendId === friend.friendId) && 'active'}`} onClick={() => this.onChoseFriend(friend.friendId)}>{friend.fullname}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-center gap-20" >
                    <button className="btn btn-success btn-med" onClick={() => onCheckOut(this.state.friendId)}>Purchase</button>
                    <a className=" btn-outline-danger" onClick={() => toggleModal(isOpenModal)}>Back</a>
                </div>
            </div>
        )
    }
}
