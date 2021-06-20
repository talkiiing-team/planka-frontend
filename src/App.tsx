import React, { useEffect, useRef } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './misc/router-animations.css'
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
import Settings from './components/Settings/Settings'
import settings from './services/settings/settings'
import useInput from './utils/useInput'

const App = () => {
  const history = useHistory()
  const animation = useInput('')

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
    <div className="w-screen scroll-root">
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              classNames={settings.state.options.animationType || 'none'}
              timeout={
                settings.state.options.animationType === 'none' ? 0 : 610
              }
            >
              <div className="w-screen min-h-screen">
                <div className="p-6 container ">
                  <Switch location={location}>
                    <Route path={buildRoute(['auth'])}>
                      <Auth />
                    </Route>
                    <Route path={buildRoute(['barcode'])}>
                      <Barcode />
                    </Route>
                    <Route path={buildRoute(['stats'])}>
                      <Achievements />
                    </Route>
                    <Route path={buildRoute(['settings'])}>
                      <Settings />
                    </Route>
                    <Route path={buildRoute([])}>
                      <Home />
                    </Route>
                  </Switch>
                </div>
              </div>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
  )
}

export default App
