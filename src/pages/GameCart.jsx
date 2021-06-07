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
        buyToUser: null,
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

    onCheckOut = async (buyToUser) => {
        const { carts } = this.state
        let buyer;
        if (buyToUser) {
            buyer = { _id: buyToUser }
        } else {
            buyer = this.props.loggedInUser
        }
        await Promise.all(carts.map(async cart => {
            const savedOrder = await this.props.saveOrder(cart, buyer)
            await buyToUser? socketService.emit('giftSent', buyToUser) : socketService.emit('orderSent', savedOrder)
            // socketService.emit('orderSent',savedOrder)
            // await socketService.emit('orderSent', savedOrder)
            this.props.userMsg('Your purchase has been made')
            setTimeout(() => {
                this.props.userMsg('')
                this.props.history.push('/profile')
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

    render() {
        const { carts, games, isCheckout } = this.state
        console.log(carts);
        const { loggedInUser } = this.props
        const img = require('../assets/img/sims4/1.jpg').default
        const totalPrice = this.getTotalPrice(games)
        return (
            <div className="cart-container container" >

                {/* <p> */}
                <div className="mb-20">
                    <Link to={`/`} >All Products  </Link> {'>'}
                    <a  >Your Shopping Cart </a>
                </div>
                {/* </p> */}

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