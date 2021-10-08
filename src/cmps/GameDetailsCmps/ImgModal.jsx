import React, { useEffect, useState } from 'react'

export const ImgModal = ({ imgs, imgIdx }) => {
    let [currImgIdx, setImgIdx] = useState(imgIdx)

    const changeIdxByDiff = (diff) => {
        if (diff > 0 && currImgIdx < imgs.length - 1) {
            setImgIdx(currImgIdx += diff)
        } else if (diff < 0 && currImgIdx > 0) {
            setImgIdx(currImgIdx += diff)
        }
    }
    return (<>
        <div className="img-modal flex column justify-center">
            <h5>{currImgIdx}/{imgs.length-1}</h5>
            <img src={imgs[currImgIdx]} alt="" />
            <div className="button-group flex space-between" >
                <button onClick={() => changeIdxByDiff(-1)} >Back</button>
                <button onClick={() => changeIdxByDiff(1)} >Next</button>
            </div>
        </div>
        <div className="screen-modal"></div>
    </>
    )
}
