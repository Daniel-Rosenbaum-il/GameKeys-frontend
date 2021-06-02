import { Link } from "react-router-dom";
import { OrderPreview } from "./OrderPreview";
export function OrderList({ games, onRemoveOrder, isCheckout }) {
    return (
        <>
            {games && games.map(game => <OrderPreview
                key={game._id}
                game={game}
                onRemoveOrder={onRemoveOrder}
                isCheckout={isCheckout}
            />)}

        </>
    )
}