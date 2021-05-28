import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { Home } from './pages/Home'
// import { LoginSignup } from './src/pages/LoginSignup'
// import { UserDetails } from './src/pages/UserDetails'

import { Header } from './cmps/Header'
import { GameApp } from './pages/GameApp'
import { About } from './pages/About'


export function App() {
  return (
    <div className="app">
      <Router>
        <Header></Header>
        <main>
          <Switch>
            <Route path="/game" component={GameApp} />
            <Route path="/about" component={About} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
        <footer>
        </footer>
      </Router>
    </div>
  )
}

