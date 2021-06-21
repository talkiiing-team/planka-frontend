import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './misc/router-animations.css'
import './misc/additional-animations.css'
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
import Leaderboard from './components/Leaderboard/Leaderboard'
import Manage from './components/Manage/Manage'

import { useSelector, useDispatch } from 'react-redux'
import {
  setOptions,
  SettingsModel,
  StorageKeySettings,
} from './store/settings/settings'
import Bindings from './components/Bindings/Bindings'

const App = () => {
  const history = useHistory()

  const settings = useSelector(
    (state: { settings: SettingsModel }) => state.settings
  )
  const dispatch = useDispatch()

  const reAuth = () => {
    backly.auth.reAuth(
      () => {
        console.log('Session continued succesfully')
      },
      () => {
        history.push(buildRoute(['auth']))
      }
    )
  }
  useEffect(() => {
    console.log(settings)
  }, [settings])

  useEffect(() => {
    navigator.onLine ? reAuth() : document.addEventListener('online', reAuth)

    const storedSettings = localStorage.getItem(StorageKeySettings)
    if (storedSettings)
      dispatch(
        setOptions((JSON.parse(storedSettings) as SettingsModel).options)
      )

    isNotificationsSupported() &&
      notificationService.send('Привет! Я - Тута, помощник в сервисе planka.')

    return () => document.removeEventListener('online', reAuth)
  }, [])

  return (
    <div className="w-screen scroll-root">
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              classNames={settings.options.animationType || 'none'}
              timeout={settings.options.animationType === 'none' ? 0 : 610}
            >
              <div className="animated-part w-full h-full">
                <div className="p-6 container relative max-w-3xl">
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
                    <Route path={buildRoute(['leaderboard'])}>
                      <Leaderboard />
                    </Route>
                    <Route path={buildRoute(['manage'])}>
                      <Manage />
                    </Route>
                    <Route path={buildRoute(['bindings'])}>
                      <Bindings />
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
