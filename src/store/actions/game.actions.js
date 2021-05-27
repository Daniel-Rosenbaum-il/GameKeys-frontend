import {gameService} from '../../services/game.service'

export function loadGames(filterBy = {}) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const games = await gameService.getGames(filterBy)
            dispatch({ type: 'SET_GAMES', games })

        } catch (err) {
            console.log('Front-action');
            console.log('GameActions: err in loadGames', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}