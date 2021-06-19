import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Backly from './services/backly/backly'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'

const App = () => {

  useEffect(() => {
    console.log(Backly)
  }, [])

  return (
    <div className="p-6 container">
      <Router>
          <Switch>
            <Route path="/auth/:variant">
              <Auth />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    </div>
  )
}

export default App
