import { utilService } from '../../services/util.service'

export function ReviewPreview({ review }) {
    const user = review.byUser
    const createdAt = new Date(review.createdAt).toLocaleDateString('en-Us', { year: 'numeric', month: 'long', day: 'numeric' })
    // if (!user) return <h1>This item has no reviews</h1>
    const userImg = require(`../../assets/img/${user.imgUrl}`).default
    return (
        <div className="review-preview">
            <div className="review-user-preview">
                <img src={userImg} alt="user-img"></img>
                <h2>{user.fullname}</h2>
            </div>
            <div className="review-game-preview">
                {utilService.renderStars(review.rate)}
                <p>Posted: {createdAt}</p>
                {/* <p>Playtime: {user.}</p> */}
                <p className="review-txt">{review.txt}</p>
            </div>

        </div>
    )
}
