// import { reviewService } from '../../services/review.service'
import { cartService } from '../../services/cart.service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from '../../services/socket.service'


export function loadCarts() {
    return async dispatch => {
        try {
            const carts = await cartService.query()
            console.log(carts, 'from load');
            dispatch({ type: 'SET_CARTS', carts })
            // socketService.on(SOCKET_EVENT_REVIEW_ADDED, review => {
            //     dispatch({ type: 'ADD_REVIEW', review })
            // })
        } catch (err) {
            console.log('ReviewActions: err in loadReviews', err)
        }
    }
}

export function addToCart(game) {
    return async dispatch => {
        try {
            console.log(game,);
            const newCart = await cartService.add({game})
            if (newCart) dispatch({ type: 'ADD_CART', cart: newCart })
        } catch (err) {
            console.log('CartActions: err in addCart', err)
        }
    }
}

export function removeCart(gameId) {
    return async dispatch => {
        try {
            await cartService.remove(gameId)
            dispatch({ type: 'REMOVE_CART', gameId })
        } catch (err) {
            console.log('cartActions: err in remove cart', err)
        }
    }
}
export function removeCarts() {
    return async dispatch => {
        try {
            await cartService.removeAll()
            dispatch({ type: 'REMOVE_CARTS'})
        } catch (err) {
            console.log('cartActions: err in remove cart', err)
        }
    }
}
