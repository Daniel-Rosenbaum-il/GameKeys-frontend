

const initialState = {
    orders: [],
}

export function orderReducer(state = initialState, action = {}) {
    const newOrders = state.orders.filter(order => order.gameId !== action.gameId)
    switch (action.type) {
        case 'SET_ORDERS':
            return { ...state, orders: action.orders }
        case 'ADD_ORDER':
            console.log('action', action.order);
            return { ...state, orders: [...state.orders, action.order] }
        case 'REMOVE_ORDER':
            return { ...state, orders: newOrders }
        case 'REMOVE_ORDERS':
            return { ...state, orders: [] }
        //   case 'REMOVE_ORDERS':
        //     return { ...state, orders: []}
        //   case 'UPDATE_ORDER':
        //     return {
        //       ...state,
        //       reviews: state.reviews.map(review =>
        //         review._id === action.review._id ? action.review : review
        //       )}
        default:
            return state
    }
}
