import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import backly from './services/backly/backly'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import { buildRoute } from './routes/routes'
import Barcode from './components/Barcode/Barcode'

const App = () => {
  const history = useHistory()

  useEffect(() => {
    console.log(backly)

    backly.auth.reAuth(
      () => {
        console.log('Session continued succesfully')
      },
      () => {
        history.push(buildRoute(['auth']))
      }
    )

    Notification.requestPermission(function (status) {
      console.log('Notification permission status:', status)
    })
    displayNotification()
  }, [])

  function displayNotification() {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        reg !== undefined && reg
          ? reg.showNotification('Hello world!')
          : console.log('No wayyyy')
      })
    }
  }

  return (
    <div className="p-6 container ">
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/barcode">
          <Barcode />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App
