// import { localService } from './storage.service'
// import { storageService } from './async-Storage.service'
import { httpService } from './http.service'
// import { games } from '../data/game.data'

export const gameService = {
    getGames,
    getById,
    remove,
    save,
    addReview
}

function getGames(filterBy = { txt: '', tag: 'all', sortBy: 'title' },) {
    return httpService.get('game', filterBy)
    
}

function getById(gameId) {
    return httpService.get(`game/${gameId}`, gameId)
    // if (filterBy.sortBy === 'title') {
    //     games.sort((game1, game2) => {
    //         return game1.title.localeCompare(game2.title)
    //     })
    // }
    // if (filterBy.sortBy === 'topReviews') {
    //     games.sort((game1, game2) => {
    //         return game2.rating - game1.rating
    //     })
    // }

    // if (filterBy.txt) {
    //     const txtRegex = new RegExp(filterBy.txt, 'i')
    //     games = games.filter(game => txtRegex.test(game.title) || txtRegex.test(game.description))
    // }
    // if (filterBy.tag !== 'all') {
    //     games = games.filter(game => {
    //         const tag = game.tags.findIndex(tag => tag === filterBy.tag)
    //         if (tag > -1) return game
    //     })
    // }
}

function remove(gameId) {
    return httpService.delete(`game/${gameId}`)
}
function save(game) {
    if (game._id) {
        return httpService.put(`game/${game._id}`, game)
    } else {
        // var newGame = createGame(game)
        // return httpService.post(`game`, newGame)
    }
}
function addReview(review, gameId, byUser){
    return httpService.put('game/review', {review, gameId, byUser})
}
// localService.saveToStorage('game', games)
