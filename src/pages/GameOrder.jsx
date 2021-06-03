import { Component } from "react"
import { connect } from 'react-redux'
import { OrderList } from "../cmps/OrderCmps/OrderList";
import { addToCart, loadOrders, removeOrder, removeOrders } from "../store/actions/order.actions";
import { orderService } from "../services/order.service";
import { Modal } from "../cmps/UtilCmps/Modal";
import { Link } from "react-router-dom";
import { OrderInfo } from "../cmps/OrderCmps/OrderInfo";
import { OrderCheckout } from "../cmps/OrderCmps/OrderCheckout";

class _GameOrder extends Component {
    state = {
        orders: [],
        games: [],
        isCheckout: false
    }

    async componentDidMount() {
        const gameId = this.props.match.params.gameId
        await this.props.addToCart(gameId)
        this.setState({ orders: this.props.orders })
        const games = await orderService.getGamesByOrders(this.props.orders)
        this.setState({ games })
    }

    onRemoveOrder = async (gameId) => {
        await this.props.removeOrder(gameId)
        const newGames = this.state.games.filter(game => game._id !== gameId)
        this.setState({ games: newGames })
        this.setState({ orders: this.props.orders })
    }

    onRemoveOrders = async (gameId) => {
        await this.props.removeOrders()
        this.setState({ games: [] })
        this.setState({ orders: [] })
    }

    onUpdateOrders = () => {

    }

    getTotalPrice = (games) => {
        if (games) {
            return games.reduce((acc, game) => {
                const finalPrice = game.price - (game.price / game.discount)
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
        const { orders } = this.state
        if (!orders.length) {
            return Modal('🛒', 'Add a game to the cart', 2000)
        }
        this.setState({ isCheckout: true })
    }

    render() {
        const { orders, games, isCheckout } = this.state
        const { loggedInUser } = this.props
        const img = require('../assets/img/sims4/1.jpg').default
        const totalPrice = this.getTotalPrice(games)
        return (
            <div className="order-container container" >

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

                <div className="order-info flex gap-20">
                    <div className={`flex column gap-20 ${isCheckout && 'width-70'}`} >
                        <div className="flex column ">
                            <div className="flex space-between column order-card  ">
                                <OrderList games={games}
                                    onRemoveOrder={this.onRemoveOrder}
                                    isCheckout={isCheckout}
                                />

                                {!isCheckout && <OrderInfo
                                    toggleIsCheckout={this.toggleIsCheckout}
                                    totalPrice={totalPrice}
                                    onUpdateOrders={this.onUpdateOrders} />}

                                {isCheckout && < OrderCheckout
                                    totalPrice={totalPrice}
                                    loggedInUser={loggedInUser}
                                />}

                            </div>

                            {!isCheckout && <a onClick={() => this.onRemoveOrders()}
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
        orders: state.orderModule.orders,
    }
}
const mapDispatchToProps = {
    addToCart,
    loadOrders,
    removeOrder,
    removeOrders
}

export const GameOrder = connect(mapStateToProps, mapDispatchToProps)(_GameOrder)