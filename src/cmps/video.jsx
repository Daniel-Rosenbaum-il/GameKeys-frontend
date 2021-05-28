import React from 'react'
import YouTube from 'react-youtube'

export function Video({id}) {
   const opts = {
                height: '390',
                width: '640',
                playerVars: {
                    // https://developers.google.com/youtube/player_parameters
                    autoplay: 0,
                },
            }
    return <YouTube videoId={id} opts={opts} />
}
