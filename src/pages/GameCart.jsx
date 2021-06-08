import { Component } from "react"
import { connect } from 'react-redux'
import { CartList } from "../cmps/cartCmps/CartList";
import { addToCart, loadCarts, removeCart, removeCarts } from "../store/actions/cart.actions";
import { saveOrder, } from "../store/actions/order.actions";
import { userMsg } from "../store/actions/user.actions";
import { cartService } from "../services/cart.service";
import { gameService } from "../services/game.service";
import { Modal } from "../cmps/UtilCmps/Modal";
import { Link } from "react-router-dom";
import { CartInfo } from "../cmps/cartCmps/CartInfo";
import { CartCheckout } from "../cmps/cartCmps/CartCheckout";
import { socketService } from "../services/socket.service";

class _GameCart extends Component {
    state = {
        carts: [],
        games: [],
        isCheckout: false,
        buyToUserId: null,
        frinedsList: null
    }

    async componentDidMount() {
        window.scrollTo(0, 0)
        const game = await gameService.getById(this.props.match.params.gameId)
        await this.props.addToCart(game, this.props.loggedInUser)
        await this.props.loadCarts()
        this.setState({ carts: this.props.carts })
        const games = await cartService.getGamesByCarts(this.props.carts)
        this.setState({ games })
    }

    onRemoveCart = async (gameId) => {
        await this.props.removeCart(gameId)
        const newGames = this.state.games.filter(game => game._id !== gameId)
        this.setState({ games: newGames })
        this.setState({ carts: this.props.carts })
    }

    onRemoveCarts = async () => {
        await this.props.removeCarts()
        this.setState({ games: [] })
        this.setState({ carts: [] })
    }

    onCheckOut = async (buyToUserId) => {
        if (!buyToUserId) return
        const { carts } = this.state
        const { loggedInUser } = this.props
        let buyer;
        if (buyToUserId !== loggedInUser._id) {
            buyer = { _id: buyToUserId }
        } else buyer = loggedInUser

        await Promise.all(carts.map(async cart => {
            const savedOrder = await this.props.saveOrder(cart, buyer)
            await buyToUserId !== loggedInUser._id ? socketService.emit('giftSent', buyToUserId) : socketService.emit('orderSent', savedOrder)
            // socketService.emit('orderSent',savedOrder)
            // await socketService.emit('orderSent', savedOrder)
            this.props.userMsg('Your purchase has been made')
            setTimeout(() => {
                this.props.userMsg('')
                // this.props.history.push('/profile')
            }, 2000);
            return savedOrder
        }))
        localStorage.clear('cart')
        return console.log('thnx for buying');
    }

    getTotalPrice = (games) => {
        if (games) {
            return games.reduce((acc, game) => {
                if (!game.discount) return acc += game.price
                const finalPrice = game.price - (game.price * (game.discount / 100))
                return acc += finalPrice
            }, 0).toFixed(2)
        }
        return 0
    }
    toggleIsCheckout = () => {
        if (!this.props.loggedInUser) {
            // Modal('👍', 'Log in to continue the purchase', 1500)
            this.props.userMsg('Log in to continue the purchase')

            return setTimeout(() => {
                this.props.history.push('/login')
                this.props.userMsg('')
            }, 1500)
        }
        const { carts } = this.state
        if (!carts.length) {
            this.props.userMsg('Added to the cart')
            // return Modal('🛒', 'Added to the cart', 2000)
        }
        this.setState({ isCheckout: true })
    }
    // onPlaceOrder 
    onFriendSelect = () => {
        console.log(this.state);
        this.setState({ frinedsList: this.props.loggedInUser.friends })
        console.log(this.props.loggedInUser.friends);
    }
    render() {
        const { carts, games, isCheckout, frinedsList } = this.state
        console.log('this.state', this.state);
        const { loggedInUser } = this.props
        const img = "https://res.cloudinary.com/dat4toc2t/image/upload/v1623183655/GameKeys/img/background-5_t0clwl.jpg"
        const totalPrice = this.getTotalPrice(games)
        return (
            <div className="cart-container container" >

                <div className="mb-20">
                    <Link to={`/`} >All Products  </Link> {'>'}
                    <a  >Your Shopping Cart </a>
                </div>

                <h2 className="mb-20" >YOUR SHOPPING CART</h2>

                <div className="cart-status mb-20">
                    <p>{(!isCheckout) ? 'YOUR ITEM\'S BEEN ADDED!' : 'Review + purchase'}
                        <span className="triangle-down" ></span>
                    </p>
                </div>

                <div className="cart-info flex gap-20">
                    <div className={`flex column gap-20 ${isCheckout && 'width-70'}`} >
                        <div className="flex column ">
                            <div className="flex space-between column cart-card  ">
                                <CartList games={games}
                                    onRemoveCart={this.onRemoveCart}
                                    isCheckout={isCheckout}
                                />

                                {!isCheckout && <CartInfo
                                    toggleIsCheckout={this.toggleIsCheckout}
                                    totalPrice={totalPrice}
                                    onFriendSelect={this.onFriendSelect}
                                    frinedsList={frinedsList}
                                    onCheckOut={this.onCheckOut}
                                    onUpdateCarts={this.onUpdateCarts} />}

                                {isCheckout && < CartCheckout
                                    totalPrice={totalPrice}
                                    loggedInUser={loggedInUser}
                                    onCheckOut={this.onCheckOut}
                                />}

                            </div>

                            {!isCheckout && <a onClick={() => this.onRemoveCarts()}
                                className="align-end btn-remove">Remove all items</a>}

                            <div>
                                {!isCheckout && <Link to="/" className="btn-med btn-light" >Continue Shopping</Link>}
                            </div>

                        </div>
                    </div>
                    {!isCheckout && <div className="card-game">
                        <div>
                            <img src={img} alt="" />
                        </div>
                        <div>
                            <img src={img} alt="" />
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        carts: state.cartModule.carts,
        msg: state.userModule.msg
    }
}
const mapDispatchToProps = {
    addToCart,
    loadCarts,
    removeCart,
    removeCarts,
    saveOrder,
    userMsg,
}

export const GameCart = connect(mapStateToProps, mapDispatchToProps)(_GameCart)