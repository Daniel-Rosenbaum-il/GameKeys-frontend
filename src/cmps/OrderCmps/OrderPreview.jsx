
export function OrderPreview({ game, onRemoveOrder, isCheckout }) {
    // console.log(game);
    // console.log(game, 'preview');
    // console.log(onRemoveOrder,'onRemoveOrder');
    const gameImg = require(`../../assets/img/${game.imgs.largeImgUrls[0]}`).default
    const finalPrice = game.price - (game.price / game.discount)
    return (
        <div className="flex space-between order-card mb-10">
            <div className="flex gap-10" >
                <img src={gameImg} alt="" />
                <p className="card-title" >{game.title}</p>
            </div>

            <div className="flex column space-evenly align-center justify-center mr-5">
                {!isCheckout && <p className="in-sale" >${game.price.toFixed(2)}</p>}
                <p className="f-price" >${finalPrice.toFixed(2)}</p>
                {!isCheckout && <a className="btn-remove" onClick={() => onRemoveOrder(game._id)} >remove</a>}
            </div>
        </div>
    )
}