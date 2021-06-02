
import { storageService } from './async-Storage.service'
import { utilService } from './util.service'
import { gameService } from './game.service'
const STORAGE_KEY = 'order'

export const orderService = {
    add,
    query,
    remove,
    getGamesByOrders,
    removeAll
}


// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

async function query(filterBy) {
    // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    // return httpService.get(`review${queryStr}`)
    const orders = await storageService.query(STORAGE_KEY)
    return orders
}
async function remove(gameId) {
    const orders = await query()
    const order = orders.find(order => order.gameId === gameId)
    // console.log('orderId from service',order._id);
    // return httpService.delete(`review/${reviewId}`)
    return storageService.remove(STORAGE_KEY, order._id)
}
async function removeAll(gameId) {
    // console.log('orderId from service',order._id);
    // return httpService.delete(`review/${reviewId}`)
    return storageService.removeAll(STORAGE_KEY)
}

async function add(gameId) {
    const orders = await query()
    const isDuplicate = orders.some(order => order.gameId === gameId)
    if (isDuplicate) return
    const order = {
        gameId,
        createAt: Date.now()
    }
    const addedOrder = storageService.post(STORAGE_KEY, order)
    return addedOrder
}
async function getGamesByOrders() {
    const games = await gameService.getGames()
    const orders = await query()
    const filterGames = orders.reduce((acc, order) => {
        const game = games.filter(game => game._id === order.gameId)
        return [...acc, ...game]
    }, [])
    return filterGames
}