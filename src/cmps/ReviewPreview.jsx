import React from 'react'
import { ReactComponent as StarSvg } from '../assets/img/icons/star.svg'
import { utilService } from '../services/util.service'

function renderStars(rate) {
    let stars = []
    for (let i = 0; i < rate; i++) {
        stars.push(<StarSvg key={i} />)
    }
    return stars
}
// function getUserReview(users, review) {
//     const user = users.find(user => user._id === review.byUserId)
//     return user
// }
export function ReviewPreview({ review, users }) {
    console.log(review);
    // const user = getUserReview(users, review)
    const createdAt = new Date(review.createdAt).toLocaleDateString('en-Us', { year: 'numeric', month: 'long', day: 'numeric' })
    return (
        <div className="review-preview">
            <div className="review-user-preview">
                <h2>{review.byUserId}</h2>
            </div>
            <div className="review-game-preview">
                {renderStars(review.rate)}
                <p>Posted: {createdAt}</p>
                <p className="review-txt">{review.txt}</p>
            </div>

        </div>
    )
}
