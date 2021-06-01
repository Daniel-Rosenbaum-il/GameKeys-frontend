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
        if (this.props.loggedInUser) {
            const { loggedInUser } = this.props.loggedInUser
            const { gameId } = this.props.match.params.gameId
            if (loggedInUser && gameId) {
                // orderService.addOrder(loggedInUser,gameId)
            }
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
                <h2  >YOUR SHOPPING CART</h2>
                
               { <div className="cart-status mb-10">
                    <p>YOUR ITEM'S BEEN ADDED!
                    <div className="triangle-down" ></div>
                    </p>
              
                   
                </div>}

                <div className="order-info flex gap-20">
                    <div className="flex column gap-20 ">
                        <div className="flex column ">
                            <div className="flex space-between order-card ">
                                <img src={img} alt="" />
                                <p className="card-title" >Transistor + Original Soundtrack</p>
                                <div className="flex column space-evenly align-center justify-center mr-5">
                                    <p className="in-sale" >${58.44}</p>
                                    {/* <p className="in-sale" >${game.price.toFixed(2)}</p> */}
                                    {/* <p className="f-price" >${finalPrice.toFixed(2)}</p> */}
                                    <p className="f-price" >$44.90</p>
                                    <a className="btn-remove" >remove</a>
                                </div>
                            </div>

                            <div className="flex space-between column order-card  ">
                                {/* <img src={img} alt="" /> */}
                                <div className="flex space-between align-center pad-15">
                                    <p className="order-title" >Estimated total</p>
                                    <div className="">
                                        <p className="f-price" >44.90</p>
                                    </div>
                                </div>
                                <div className="flex column  space-evenly align-center justify-center mr-5 pad-15">
                                    <p>Is this a purchase for yourself or is it a gift? Select one to continue to checkout.</p>
                                    <div className="flex gap-10 ">
                                        <button className="btn-cta btn-med" >Purchase for myself</button>
                                        <button className="btn-cta btn-med" >Purchase as a gift</button>
                                    </div>
                                    {/* <p className="in-sale" >${game.price.toFixed(2)}</p> */}
                                    {/* <p className="f-price" >${finalPrice.toFixed(2)}</p> */}
                                </div>
                                <div>
                                    <p>1 All prices include VAT where applicable</p>
                                </div>
                            </div>
                            {/* <div> */}
                                <a className="align-end btn-remove">Remove all items</a>
                            {/* </div> */}
                            <div>
                                <Link to="/" className="btn-med btn-light" >Continue Shopping</Link>
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