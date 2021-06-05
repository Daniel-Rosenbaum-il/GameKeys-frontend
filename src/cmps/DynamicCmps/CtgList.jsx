import { Link } from 'react-router-dom'
export function CtgList() {
    return (
        <>
            <h2 className="ctg-l-title mb-20 container">Browse game keys</h2>
            <div className="ctg-list  flex container gap-20 mb-20">
                <Link className="btn-big " to="/game?tag=adventure" >Adventure</Link>
                <Link className="btn-big " to="/game?tag=racing" >Racing</Link>
                <Link className="btn-big " to="/game?tag=action" >Action</Link>
                <Link className="btn-big " to="/game?tag=sports" >Sports</Link>
            </div>
        </>
    )
}

