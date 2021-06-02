// import { reviewService } from '../../services/review.service'
import { orderService } from '../../services/order.service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from '../../services/socket.service'


export function loadOrders() {
    return async dispatch => {
        try {
            const orders = await orderService.query()
            console.log(orders, 'from load');
            dispatch({ type: 'SET_ORDERS', orders })
            // socketService.on(SOCKET_EVENT_REVIEW_ADDED, review => {
            //     dispatch({ type: 'ADD_REVIEW', review })
            // })
        } catch (err) {
            console.log('ReviewActions: err in loadReviews', err)
        }
    }
}

export function addToCart(gameId) {
    return async dispatch => {
        try {
            const newOrder = await orderService.add(gameId)
            if (newOrder) dispatch({ type: 'ADD_ORDER', order: newOrder })
        } catch (err) {
            console.log('ReviewActions: err in addReview', err)
        }
    }
}

export function removeOrder(gameId) {
    return async dispatch => {
        try {
            await orderService.remove(gameId)
            dispatch({ type: 'REMOVE_ORDER', gameId })
        } catch (err) {
            console.log('orderActions: err in remove order', err)
        }
    }
}
export function removeOrders() {
    return async dispatch => {
        try {
            await orderService.removeAll()
            dispatch({ type: 'REMOVE_ORDERS'})
        } catch (err) {
            console.log('orderActions: err in remove order', err)
        }
    }
}
