
import { storageService } from './async-Storage.service'
import { utilService } from './util.service'
import { gameService } from './game.service'
const STORAGE_KEY = 'cart'

export const cartService = {
    add,
    query,
    remove,
    getGamesByCarts,
    removeAll
}


// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

async function query(filterBy) {
    // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    // return httpService.get(`review${queryStr}`)
    const carts = await storageService.query(STORAGE_KEY)
    return carts
}
async function remove(gameId) {
    const carts = await query()
    const cart = carts.find(cart => cart.game._id === gameId)
    // console.log('cartId from service',cart._id);
    // return httpService.delete(`review/${reviewId}`)
    return storageService.remove(STORAGE_KEY, cart._id)
}
async function removeAll(gameId) {
    // console.log('cartId from service',cart._id);
    // return httpService.delete(`review/${reviewId}`)
    return storageService.removeAll(STORAGE_KEY)
}

async function add({ game }) {
    const { price, discount, title, seller,serialKey } = game
    const carts = await query()
    const isDuplicate = carts.some(cart => cart.game._id === game._id)
    if (isDuplicate) return
    console.log('game', game);
    const img = game.imgs.largeImgUrls[0]
    const cart = {
        game: {
            _id: game._id,
            price,
            discount,
            title,
            sellerId: seller._id,
            img,
            serialKey
        },
    }
    const addedCart = storageService.post(STORAGE_KEY, cart)
    return addedCart
}
async function getGamesByCarts() {
    const games = await gameService.getGames()
    const carts = await query()
    const filterGames = carts.reduce((acc, cart) => {
        const game = games.filter(game => game._id === cart.game._id)
        return [...acc, ...game]
    }, [])
    return filterGames
}