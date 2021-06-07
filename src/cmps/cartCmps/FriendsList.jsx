import React from 'react'

export function FriendsList({frinedsList}) {
    console.log(frinedsList);
    return (
        <div className="friends-modal">
            {frinedsList.map(friend => {
                <div>
                    <h1>bbbbbbbbbbbbbbbb</h1>
                    {/* <p>{friend.friendId}</p>
                    <p>{friend.fullname}</p> */}
                </div>
            })}
        </div>
    )
}
