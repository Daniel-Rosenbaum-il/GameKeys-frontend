import { Link } from 'react-router-dom'
export function CtgList() {
    return (
        <>
            <h2 className="mb-20 container">Browse game keys</h2>
            <div className="ctg-list flex justify-center gap-20 mb-20">
                <Link className="btn-big " to="game/new_releases" >New Releases </Link>
                <Link className="btn-big " to="game/free_game" >Free Games</Link>
                <Link className="btn-big " to="game/Action" >Action</Link>
                <Link className="btn-big " to="game/top_rated" >Top Rated</Link>
            </div>
        </>
    )
}