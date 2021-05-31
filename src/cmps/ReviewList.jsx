import React from 'react'
import { ReviewPreview } from './ReviewPreview'

export function ReviewList({ reviews, users }) {
    return (
        <div className="review-list">
            {reviews.map(review => <ReviewPreview users={users} review={review} key={review.id} />)}
        </div>
    )
}
