import { ReactComponent as TwitchIcon } from '../../src/assets/img/icons/twitter.svg'
import  {ReactComponent as Instagram} from '../../src/assets/img/icons/instagram.svg'
import {ReactComponent as Facebook} from '../../src/assets/img/icons/facebook.svg'

const logo = require('../assets/img/logo/GameKeys-BIG.png').default
export function Footer() {
  return (
    <footer className="flex column align-center">
      <div className="icon-container flex mb-20  justify-center gap-10">
        <div className="flex align-center">
          <TwitchIcon className="icon" />
          <div className="flex column">
            <p className="icon-title" >11.9k</p>
            <span>Followers</span>
          </div>
        </div>
        <div className="flex align-center">
          <Instagram className="icon" />
          <div className="flex column">
            <p className="icon-title" >48k</p>
            <span>Followers</span>
          </div>
        </div>
        <div className="flex align-center">
          <Facebook className="icon"/>
          <div className="flex column">
            <p className="icon-title" >883k</p>
            <span>LIKES</span>
          </div>
        </div>
      </div>
      <img className="logo-footer" src={logo} alt=""></img>
      <small>copyright gamekeys.com 2021. all rights reserved &copy;2021</small>
    </footer>
  )
}