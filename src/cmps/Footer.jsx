import twitchIcon from '../../src/assets/img/icons/twiter.svg'
import instagram from '../../src/assets/img/icons/instagram.svg'
import facebook from '../../src/assets/img/icons/facebook.svg'

export function Footer(){
    return(
        <footer className="flex column align-center">
        <div className="flex mb-20 icon-container justify-center gap-10">
          <div className="flex align-center">
            <img className="icon" src={twitchIcon} alt="" />
            <div className="flex column">
              <p className="icon-title" >11.9k</p>
              <span>Followers</span>
            </div>
          </div>
          <div className="flex align-center">
            <img className="icon" src={instagram} alt="" />
            <div className="flex column">
              <p className="icon-title" >48k</p>
              <span>Followers</span>
            </div>
          </div>
          <div className="flex align-center">
            <img className="icon" src={facebook} alt="" />
            <div className="flex column">
              <p className="icon-title" >883k</p>
              <span>LIKES</span>
            </div>
          </div>
        </div>
        <p className="logo mb-20">G<span>a</span><span>m</span><span>e</span> keys</p>
        <small>copyright gamekeys.com 2021. all rights reserved &copy;2021</small>
      </footer>
    )
}