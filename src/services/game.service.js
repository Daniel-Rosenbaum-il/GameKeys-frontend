import { localService } from './storage.service'
import { storageService } from './async-Storage.service'

import { games } from '../data/game.data'

export const gameService = {
    getGames,
    getById
}

async function getGames(filterBy) {
    let games = await storageService.query('game')
    if (filterBy) {
        const txtRegex = new RegExp(filterBy.txt, 'i')
        games = games.filter(game => txtRegex.test(game.title) || txtRegex.test(game.description))
    }
    return games
}
function getById(userId) {
    return storageService.get('game', userId)
}
// console.log(games);
localService.saveToStorage('game', games)
