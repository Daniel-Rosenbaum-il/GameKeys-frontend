import { Component } from 'react'

export class FriendsList extends Component {
    state = {
        friendId: null
    }

    onChoseFriend = (friendId) => {
        console.log(friendId);
        this.setState({ friendId })
    }

    render() {
        const {friendId} = this.state
        const { frinedsList, onCheckOut } = this.props
        return (
            <div className="friends-modal flex column space-between">
                <div>
                    <h4>Chose from your friends list</h4>
                    {frinedsList.map(friend => {
                        return (
                            <div key={`friend${friend.friendId}`}>
                                <p className={ (friendId === friend.friendId) && "active"} onClick={() => this.onChoseFriend(friend.friendId)}>{friend.fullname}</p>
                            </div>
                        )
                    })}
                </div>
                <button className="btn btn-success btn-med" onClick={() => onCheckOut(this.state.friendId)}>Purchase</button>
            </div>
        )
    }
}
