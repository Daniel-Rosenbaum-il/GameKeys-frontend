import { Link } from 'react-router-dom'
export function CtgList() {
    return (
        <>
            <h2 className="mb-20 container">Browse game keys</h2>
            <div className="ctg-list flex justify-center gap-20 mb-20">
                <Link className="btn-big " to="game/adventure" >Adventure</Link>
                <Link className="btn-big " to="game/racing" >Racing</Link>
                <Link className="btn-big " to="game/action" >Action</Link>
                <Link className="btn-big " to="game/sports" >Sports</Link>
            </div>
        </>
    )
}

