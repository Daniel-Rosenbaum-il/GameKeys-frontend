

const initialState = {
    carts: [],
}

export function cartReducer(state = initialState, action = {}) {
    const newCarts = state.carts.filter(cart => cart.gameId !== action.gameId)
    switch (action.type) {
        case 'SET_CARTS':
            return { ...state, carts: action.carts }
        case 'ADD_CART':
            console.log('action', action.cart);
            return { ...state, carts: [...state.carts, action.cart] }
        case 'REMOVE_CART':
            return { ...state, carts: state.carts.filter(cart => cart.game._id !== action.gameId) }
        case 'REMOVE_CARTS':
            return { ...state, carts: [] }
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
