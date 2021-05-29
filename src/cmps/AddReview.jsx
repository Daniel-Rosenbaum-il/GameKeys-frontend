import { Component } from 'react'
// import { bookService } from '../services/book-service.js'
import { utilService } from '../services/util.service'
import { Rating } from './Rating.jsx'
import { Link } from 'react-router-dom'

export class AddReview extends Component {
    state = {
        review: {
            id: utilService.makeId(),
            rating: null,
            createdAt: Date.now(),
            txt: null
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'radio' ? +target.value : target.value
        this.setState(prevState => ({
            review: {
                ...prevState.review,
                [field]: value
            }
        }))
    }
    onSubmit = (ev) => {
        ev.preventDefault()
        // const bookId = this.props.match.params.bookId;
        // bookService.addReview(bookId, this.state.review)
    }
    render() {
        const { rating, txt } = this.state.review;
        const { loggedInUser } = this.props
        return (
            <div className="add-review-form">
                <form onSubmit={this.onSubmit}>
                    <h2>Write A Review </h2>
                    <h3>{loggedInUser && loggedInUser.fullname}</h3>
                    <Rating rating={rating} handleChange={this.handleChange} />
                    <textarea name="txt" id="" cols="40" rows="10" onChange={this.handleChange}></textarea>
                    <div className="review-btn">
                        {loggedInUser && < button className="btn-add-review">Send</button>}
                        {!loggedInUser && < button className="btn-login-review"><Link to="/login">Login</Link></button>}
                    </div>
                </form>
            </div>
        )

    }
}