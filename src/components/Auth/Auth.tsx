import React from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import Up from './Up'
import In from './In'

const Auth = () => {
  let match = useRouteMatch()

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row gap-x-6 items-center">
        <Link to={`${match.path}/up`}>
          <div className="text-blue-500">Зарегистрироваться</div>
        </Link>
        <Link to={`${match.path}/in`}>
          <div className="text-blue-500">Войти</div>
        </Link>
      </div>
      <Switch>
        <Route path={`${match.path}/in`}>
          <In />
        </Route>
        <Route path={`${match.path}/up`}>
          <Up />
        </Route>
        <Route path={`${match.path}/`}>
          <Up />
        </Route>
      </Switch>
    </div>
  )
}

export default Auth
