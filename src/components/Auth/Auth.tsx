import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Up from './Up'
import In from './In'

const Auth = () => {
  let match = useRouteMatch()

  return (
    <div className="flex flex-col gap-y-4">
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
