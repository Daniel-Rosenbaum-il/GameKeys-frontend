import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { Login } from './pages/Login'
// import { UserDetails } from './src/pages/UserDetails'

import { Header } from './cmps/Header'
import { GameApp } from './pages/GameApp'
import { GameDetails } from './pages/GameDetails'
import { About } from './pages/About'


import { Footer } from './cmps/Footer'
import { GameCart } from './pages/GameCart'
import { UserProfile } from './pages/UserProfile'

export function App() {
  return (
    <div className="app">
      <Router>
        <Header></Header>
        <main className="mb-20">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/game/order/:gameId" component={GameCart} />
            <Route path="/game/:gameId" component={GameDetails} />
            <Route path="/game" component={GameApp} />
            <Route path="/about" component={About} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
          <Footer/>
      </Router>
    </div>
  )
}

