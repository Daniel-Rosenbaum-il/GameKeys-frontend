import { utilService } from '../../services/util.service'

export function ReviewPreview({ review }) {
    const user = review.byUser
    const createdAt = new Date(review.createdAt).toLocaleDateString('en-Us', { year: 'numeric', month: 'long', day: 'numeric' })
    const userImg = user.imgUrl
    console.log(userImg);
    return (
        <div className="review-preview">
            <div className="review-user-preview">
                <img src={userImg} alt="user-img"></img>
                <h2>{user.fullname}</h2>
            </div>
            <div className="review-game-preview">
                {utilService.renderStars(review.rate)}
                <p>Posted: {createdAt}</p>
                <p className="review-txt">{review.txt}</p>
            </div>

        </div>
    )
}
