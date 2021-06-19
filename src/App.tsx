import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'

const options = [
  { id: 'one', value: 'First Value' },
  { id: 'two', value: 'Second Value' },
  { id: 'three', value: 'Third Value' },
]

const App = () => {
  return (
    <div className="p-6 container">
      <Router>
          <Switch>
            <Route path="/auth">
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
