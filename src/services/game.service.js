import {localService} from './storage.service'
import {storageService} from './async-Storage.service'

import {games} from '../data/game.data'

export const gameService ={
    getGames
}

function getGames() {
    return storageService.query('game')
}

// console.log(games);
localService.saveToStorage('game',games)
