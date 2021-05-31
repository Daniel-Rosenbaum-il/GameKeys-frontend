import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { Login } from './pages/Login'
// import { UserDetails } from './src/pages/UserDetails'

import { Header } from './cmps/Header'
import { GameApp } from './pages/GameApp'
import { GameDetails } from './pages/GameDetails'
import { About } from './pages/About'

import twitchIcon from '../src/assets/img/icons/twiter.svg'
import instagram from '../src/assets/img/icons/instagram.svg'
import facebook from '../src/assets/img/icons/facebook.svg'

export function App() {
  return (
    <div className="app">
      <Router>
        <Header></Header>
        <main className="mb-20">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/game/:gameId" component={GameDetails} />
            <Route path="/game" component={GameApp} />
            <Route path="/about" component={About} />
            <Route path="/" component={Home} />
          </Switch>
        </main>

        <footer class="flex column align-center">


          <div className="flex mb-20 icon-container space-evenly">

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
          <p className="logo">Game keys</p>
          <small>copyright gamekeys.com 2021. all rights reserved &copy;2021</small>
        </footer>
      </Router>
    </div>
  )
}

