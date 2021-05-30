import React from 'react'
import { ReactComponent as StarSvg } from '../assets/img/icons/star.svg'
import { utilService } from '../services/util.service'

function renderStars(rate) {
    let stars=[]
    for (let i = 0; i < rate; i++) {
        stars.push(<StarSvg />) 
    }
    return stars
}
export function ReviewPreview({ review }) {
    console.log(review);
    const createdAt =  new Date(review.createdAt).toLocaleDateString('en-Us' ,{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
    return (
        <div className="review-preview">
            <div className="review-user-preview">
                <h2>{review.byUserId}</h2>
            </div>
            <div className="review-game-preview">
                {renderStars(review.rate)}
                <p>Posted:{createdAt}</p>
                <p className="review-txt">{review.txt}</p>
            </div>

        </div>
    )
}
