import { localService } from './storage.service'
import { storageService } from './async-Storage.service'

import { games } from '../data/game.data'

export const gameService = {
    getGames,
    getById,
    remove,
    save
}

async function getGames(filterBy = { txt: '', tag: 'all' ,sortBy:'title'},) {
    let games = await storageService.query('game')
    if (filterBy.sortBy === 'title') {
        games.sort((game1, game2) => {
            return game1.title.localeCompare(game2.title)
        })
    }
    if(filterBy.sortBy==='topReviews'){
        games.sort((game1, game2) => {
            return game2.rating - game1.rating
        })
    }

    if (filterBy.txt) {
        const txtRegex = new RegExp(filterBy.txt, 'i')
        games = games.filter(game => txtRegex.test(game.title) || txtRegex.test(game.description))
    }
    if (filterBy.tag !== 'all') {
        games = games.filter(game => {
            const tag = game.tags.findIndex(tag => tag === filterBy.tag)
            if (tag > -1) return game
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
function save(game) {
        if (game._id) {
            return storageService.put('game', game)
        } else {
            // var newGame = createGame(game)
            // return storageService.post(STORAGE_KEY, newGame)
        }
    }
localService.saveToStorage('game', games)
