import React, { useState } from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import Up from './Up'
import In from './In'
import RTitle from '../../ui/RTitle'

const Auth = () => {
  let match = useRouteMatch()
  return (
    <div className="flex flex-col gap-y-4">
      <ul>
        <li>
          <Link to={`${match.path}/up`}><RTitle value={'Форма регистрации'}/></Link>
        </li>
        <li>
          <Link to={`${match.path}/in`}><RTitle value={'Форма входа'}/></Link>
        </li>
      </ul>
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
