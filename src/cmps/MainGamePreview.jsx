
export function MainGamePreview({ game }) {
    const img2 = require(`../assets/img/biomutant_616x353.jpg`).default
    console.log(game);
    // const finalPrice = game.price - (game.price / game.discount)
    return (
        <>
            <div className="main-game-preview container mb-20">
                <button className="btn btn-prev">&#10094;</button>

                <div className="preview-container flex column">
                    <div className="m-img" >
                        <img src={img2} alt="" />
                    </div>
                    {/* <div className="flex"> */}

                    <div className="imgs-container flex column">
                        <img src={img2} alt="" />
                        <img src={img2} alt="" />
                        <h2>BIOMUTANT</h2>
                        <p>Release date:25 May, 2021</p>
                    </div>
                    <div className="flex column">
                        <img src={img2} alt="" />
                        <img src={img2} alt="" />
                        <div className="preview-price">
                            {/* <p>${finalPrice.toFixed(2)}</p> */}
                            <p className="discount">25%</p>
                            <div className="flex column">
                                <p className="in-sale" >$103</p>
                                <p className="f-price" >$77.25</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className=" btn btn-next"> &#10095;</button>
            </div>
        </>
    )
}