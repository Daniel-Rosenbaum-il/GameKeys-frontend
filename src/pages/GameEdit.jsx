import React, { useEffect, useState } from 'react'
import { useForm } from '../services/customHooks.js'
import { useDispatch } from 'react-redux'
import { saveGame } from '../store/actions/game.actions.js'
import { gameService } from '../services/game.service'
import {utilService} from '../services/util.service'
import {Loader} from '../cmps/UtilCmps/Loader'

export const GameEdit = ({ history, match }) => {
    const [game, handleChange, setGame] = useForm(gameService.getEmptyGame())
    const [videoUrls, setVideoUrls] = useState({});

    const dispatch = useDispatch()
    useEffect(() => {
        window.scrollTo(0, 0)
        loadGame()
    }, [])

    const loadGame = async () => {
        const { gameId } = match.params
        if (gameId) {
            const _game = await gameService.getById(gameId)
            setVideoUrls(utilService.arrayToObject(_game.videoUrls,'url'))
            setGame(_game)
        }
    }
    
    const handleChanges = prop => event => {
        setVideoUrls({...videoUrls, [prop]: event.target.value});
    };

    
    const onAddGame = async (ev) => {
        ev.preventDefault()
        game.videoUrls = Object.values(videoUrls)
        dispatch(saveGame(game))
        history.push('/')
    }
    if (game._id === undefined) {
        return <Loader/>}
    else 
        return (
        <form className="game-edit container" onSubmit={(ev) => onAddGame(ev)}>
            {game !== 0 && <h1>Game edit</h1>}
            <div className="">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" placeholder="title" value={game.title} onChange={handleChange} />
                <label htmlFor="serialKey">SerialKey:</label>
                <input type="text" name="serialKey" placeholder="serialKey" value={game.serialKey} onChange={handleChange} />
                <label htmlFor="price">Price:</label>
                <input type="number" name="price" placeholder="price" value={game.price} onChange={handleChange} />
                <label htmlFor="Discount">Discount:</label>
                <input type="number" name="discount" placeholder="discount" value={game.discount} onChange={handleChange} />
                <label htmlFor="sDescription">Short description:</label>
                <textarea type="textarea" name="sDescription" cols="40" rows="5" placeholder="sDescription" value={game.sDescription} onChange={handleChange} />
                <label htmlFor="description">Description:</label>
                <textarea type="textarea" name="description" placeholder="description" cols="40" rows="10" value={game.description} onChange={handleChange} />
                { <label htmlFor="videoUrls">Video Url: add a Youtube url</label> }
                {/* {game.videoUrls.map((url,idx) => <input type="text" key={idx} name={videoUrls} placeholder="Video-Url" value={videoUrls[idx]} onChange={handleChanges(idx)} />)} */}
                <input type="text" name="videoUrls[1]" placeholder="Video-Url" value={videoUrls.url0} onChange={handleChanges('url0')} />
                <input type="text" name="videoUrls[2]" placeholder="Video-Url" value={videoUrls.url1} onChange={handleChanges('url1')} />
                <input type="text" name="videoUrls[3]" placeholder="Video-Url" value={videoUrls.url2} onChange={handleChanges('url2')} />
                <button className='btn-main'>Save</button>
            </div>
        </form>
    )
}