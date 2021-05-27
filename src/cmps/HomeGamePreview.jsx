
export function HomeGamePreview({ game }) {
    const img2 = require(`../assets/img/the_witcher_292x136.jpg`).default
    console.log(game);
    const finalPrice = game.price - (game.price / game.discount)
    return (
        <div className="home-game-preview">
            <div>
                <div className="s-img">
                    <img src={img2} alt="" />

                </div>
                <div className="preview-price">
                    <p>${finalPrice.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}