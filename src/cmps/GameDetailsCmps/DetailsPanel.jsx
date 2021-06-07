import { Link } from 'react-router-dom'
import { Video } from '../Video'
import { InfoBlock } from '../InfoBlock'
export function DetailsPanel({ game, getDateString }) {
    const { imgs, videoUrls, description, releasedAt, seller, tags } = game
    const urlImgs = imgs.largeImgUrls.map(img => require(`../../assets/img/${img}`).default)
    return (
        <div className="details-container flex gap-20">
            <div className="video-container">
                <div className="video flex column gap-10 justify-center">
                    <Video url={videoUrls[0]} />
                    {/* <div className="flex img-container gap-10"> */}
                    <div className="grid-container">
                        {urlImgs.map((img, idx) => {
                            if (idx >= 4) return
                            return <div key={'i' + idx} > <img src={img} alt="" /></div>
                        })}
                    </div>
                </div>
            </div>
            <div className="details-info">
                <img className="mb-10" src={urlImgs[0]} alt="" />
                <p maxLength="5" className="s-desc">{description}</p>
                <InfoBlock title="RELEASE DATE" value={getDateString(releasedAt)} />
                <InfoBlock title="Seller" value={seller.fullname} />
                <p className="dark-txt"> Popular user-defined tags for this product:</p>
                <div className="tag-container mb-20 flex">
                    {tags.map((tag, idx) => <Link className="btn" to={`/game?tag=${tag}`} key={idx}>{tag} </Link>).slice(0, 3)}
                </div>
            </div>
        </div>
    )
}