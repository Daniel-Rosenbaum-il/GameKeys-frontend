import { httpService } from './http.service'

export const orderService = {
    getOrders,
    getById,
    // remove,
    save,
    // addReview
}

function getOrders(filterBy = {},) {
    return httpService.get('order', filterBy)
    
}

function getById(orderId) {
    return httpService.get(`order/${orderId}`, orderId)
}

function save(order, buyer) {
    // if (order._id) {
    //     return httpService.put(`order/${order._id}`, order)
    // } else {
        const newOrder = {
            order, 
            buyer
        }
        return httpService.post(`order`, newOrder)
    // }
}
