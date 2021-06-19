import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import backly from './services/backly/backly'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import { buildRoute } from './routes/routes'
import Barcode from './components/Barcode/Barcode'
import {
  isNotificationsSupported,
  notificationService,
} from './services/notifications/notifications'
import Achievements from './components/Achievements/Achievements'

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
    isNotificationsSupported() && notificationService.send('Hi, testing!')
  }, [])

  return (
    <div className="p-6 container ">
      <Switch>
        <Route path={buildRoute(['auth'])}>
          <Auth />
        </Route>
        <Route path={buildRoute(['barcode'])}>
          <Barcode />
        </Route>
        <Route path={buildRoute(['stats'])}>
          <Achievements />
        </Route>
        <Route path={buildRoute([])}>
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App
