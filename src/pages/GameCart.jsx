import { Component } from "react"
import { connect } from 'react-redux'
import { CartList } from "../cmps/cartCmps/CartList";
import { addToCart, loadCarts, removeCart, removeCarts } from "../store/actions/cart.actions";
import { saveOrder, } from "../store/actions/order.actions";
import { cartService } from "../services/cart.service";
import { gameService } from "../services/game.service";
import { Modal } from "../cmps/UtilCmps/Modal";
import { Link } from "react-router-dom";
import { CartInfo } from "../cmps/cartCmps/CartInfo";
import { CartCheckout } from "../cmps/cartCmps/CartCheckout";

class _GameCart extends Component {
    state = {
        carts: [],
        games: [],
        isCheckout: false
    }

    async componentDidMount() {
        const game = await gameService.getById(this.props.match.params.gameId)
        console.log(game);
        await this.props.addToCart(game)
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

    onCheckOut = async () => {
        const { carts } = this.state
        const buyer = this.props.loggedInUser
        await carts.forEach(cart =>{
             this.props.saveOrder(cart, buyer)
            return cart
        })
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
            Modal('👍', 'Log in to continue the purchase', 1500)
            return setTimeout(() => {
                this.props.history.push('/login')
            }, 1500)
        }
        const { carts } = this.state
        if (!carts.length) {
            return Modal('🛒', 'Added to the cart', 2000)
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

                <p>
                    <div className="mb-20">
                        <Link to={`/`} >All Products  </Link> {'>'}
                        <a  >Your Shopping Cart </a>
                    </div>
                </p>

                <h2 className="mb-20" >YOUR SHOPPING CART</h2>

                <div className="cart-status mb-20">
                    <p>{(!isCheckout) ? 'YOUR ITEM\'S BEEN ADDED!' : 'Review + purchase'}
                        <div className="triangle-down" ></div>
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
    }
}
const mapDispatchToProps = {
    addToCart,
    loadCarts,
    removeCart,
    removeCarts,
    saveOrder,
}

export const GameCart = connect(mapStateToProps, mapDispatchToProps)(_GameCart)