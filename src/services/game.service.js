// import { localService } from './storage.service'
// import { storageService } from './async-Storage.service'
import { httpService } from './http.service'
// import { games } from '../data/game.data'

export const gameService = {
    getGames,
    getById,
    remove,
    save,
    addReview,
    getEmptyGame
}

function getGames(filterBy = { txt: '', tag: 'all', sortBy: 'title' },) {
    return httpService.get('game', filterBy)
    
}
function getEmptyGame(){
    return { title:'',
        price:0,
        tags:[],
        discount:0,
        imgs:{
            largeImgUrls:[ '', '','' , '', ''],
            smallImgUrls:[],
        },
        description:'',
        releasedAt:'',
        serialKey:'',
        rating: 0,
        wishlistCount: 0,
        reviews: [],
        videoUrls:[],
        sDescription:'',}
}
function getById(gameId) {
    return httpService.get(`game/${gameId}`, gameId)
}

function remove(gameId) {
    return httpService.delete(`game/${gameId}`)
}
function save(game) {
    if (game._id) {
        return httpService.put(`game/${game._id}`, game)
    } else {
        return httpService.post(`game`, game)
    }
}
function addReview(review, gameId, byUser){
    return httpService.put('game/review', {review, gameId, byUser})
}
// localService.saveToStorage('game', games)
