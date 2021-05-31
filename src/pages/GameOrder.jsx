import { Component } from "react"
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
class _GameOrder extends Component {
    state = {
        // user: null,
        orders: null
    }
    componentDidMount() {
        console.log(this.props.match.params.gameId);
        // console.log(this.props.loggedInUser);
        const { loggedInUser } = this.props.loggedInUser
        const { gameId } = this.props.match.params.gameId
        if (loggedInUser && gameId) {
            // orderService.addOrder(loggedInUser,gameId)
        }


    }
    render() {
        const img = require('../assets/img/sims4-l.jpg').default
        return (
            <div className="order-container container">
                <p>
                    <Link to={`/`} >All Products  </Link> {'>'}
                    <Link  >Your Shopping Cart </Link>
                </p>
                <h2>YOUR SHOPPING CART</h2>

                <div className="flex gap-20">
                    <div className="flex column gap-20 ">
                        <div className="flex column ">

                            <div className="flex space-between order-card ">
                                <img src={img} alt="" />
                                <p className="card-title" >Transistor + Original Soundtrack</p>
                                <div className="flex column space-evenly align-center justify-center mr-5">
                                    <p className="in-sale" >${37.44}</p>
                                    {/* <p className="in-sale" >${game.price.toFixed(2)}</p> */}
                                    {/* <p className="f-price" >${finalPrice.toFixed(2)}</p> */}
                                    <p className="f-price" >${44.90}</p>
                                    <a>remove</a>
                                </div>
                            </div>

                            <div className="flex space-between column order-card  ">
                                {/* <img src={img} alt="" /> */}
                                <div className="flex space-between align-center pad-15">
                                    <h2 className="order-title" >Estimated total</h2>
                                    <div className="">
                                        <p className="f-price" >${24.90}</p>
                                    </div>
                                </div>
                                <div className="flex  space-evenly align-center justify-center mr-5">
                                    <p>Is this a purchase for yourself or is it a gift? Select one to continue to checkout.</p>
                                    <button>Purchase for myself</button>
                                    <button>Purchase as a gift</button>
                                    {/* <p className="in-sale" >${game.price.toFixed(2)}</p> */}
                                    {/* <p className="f-price" >${finalPrice.toFixed(2)}</p> */}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="card-game">
                        <div>
                            <img src={img} alt="" />
                        </div>
                        <div>
                            <img src={img} alt="" />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
    }
}
const mapDispatchToProps = {
    // login,
    // logout,
    // signup,
    // removeUser,
    // loadUsers
}

export const GameOrder = connect(mapStateToProps, mapDispatchToProps)(_GameOrder)