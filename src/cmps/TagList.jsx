import React from 'react'

export const TagList = ({tags}) => {
    return (
        <div className="tag-list">
            {tags.map((tag, idx) => <div className="btn txt-cap" to={`/game?tag=${tag}`} key={idx}>{tag} </div>)}
        </div>
    )
}
