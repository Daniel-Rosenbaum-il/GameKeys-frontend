import {Component} from 'react'
import React from 'react'
import ReactPlayer from 'react-player'

export class Video extends Component {
    render() {
        const {id} = this.props
        return (
            <div className='player-wrapper'>
                <ReactPlayer
                    className='react-player'
                    url={id}
                    width='100%'
                    height='100%'
                    controls={true}
                />
            </div>
        )
    }
}

