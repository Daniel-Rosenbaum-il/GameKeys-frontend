import { Component } from 'react'

export class FriendsList extends Component {
    state = {
        friendId:null
    }

    onChoseFriend = (friendId) => {
        console.log(friendId);
        this.setState({ friendId })
    }

    render() {
        const { frinedsList, onCheckOut } = this.props
        return (
            <div className="friends-modal">
                {frinedsList.map(friend => {
                    return (
                        <div key={`friend${friend.friendId}`}>
                            <p onClick={() => this.onChoseFriend(friend.friendId)}>{friend.fullname}</p>
                        </div>
                    )
                })}
                <button className="btn btn-success btn-med" onClick={() => onCheckOut(this.state.friendId)}>Purchase</button>
            </div>
        )
    }
}
