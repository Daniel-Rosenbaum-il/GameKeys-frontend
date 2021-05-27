import img1 from '../assets/img/gta.jpg';

export function HomeGamePreview({ game }) {
    const img2 = require('../assets/img/gta.jpg')
    // console.log(img2.default);
    const { imgs, price } = game
    // const img2 = require(`${imgs.largeImgUrls[0]}`)
    // const finalPrice = price - (price / discount)
    console.log(imgs.largeImgUrls[0]);
    return (
        <div className="home-game-preview">
            <div>
                {/* <img src={imgs.largeImgUrls[0]} alt="" /> */}
                <div className="s-img">
                    {/* <img src={img1} alt="" /> */}
                    {/* <img src="./assets/img/gta.jpg" alt="" /> */}
                    <img src={img2.default} alt="" />

                </div>
                <div className="preview-price">
                    <div>
                        <p>188$</p>
                    </div>
                </div>
            </div>
        </div>
    )
}