import { localService } from './storage.service'
import { storageService } from './async-Storage.service'

import { games } from '../data/game.data'

export const gameService = {
    getGames,
    getById,
    remove
}

async function getGames(filterBy = { txt: '', tag: 'All' }, sortBy = 'title') {
    // console.log(filterBy)
    let games = await storageService.query('game')
    // if(sortBy='title'){
    //     games.sort(g)
    // }
    if (filterBy.txt) {
        const txtRegex = new RegExp(filterBy.txt, 'i')
        games = games.filter(game => txtRegex.test(game.title) || txtRegex.test(game.description))
    }
    if (filterBy.tag !== 'All') {
        games = games.filter(game => {
         const tag = game.tags.findIndex(tag => tag === filterBy.tag)
        if(tag> -1) return game
        })
    }
    return games
}
function getById(gameId) {
    return storageService.get('game', gameId)
}
function remove(gameId) {
    return storageService.remove('game', gameId)
}
// console.log(games);
localService.saveToStorage('game', games)
