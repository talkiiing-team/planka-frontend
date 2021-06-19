import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Button from '../../ui/Button'
import { buildRoute } from '../../routes/routes'
import backly from '../../services/backly/backly'

const Home = () => {
  const history = useHistory()

  const logout = () => {
    backly.auth.logout()
    history.push(buildRoute(['auth']))
  }

  return (
    <div className="flex flex-col gap-y-4 mx-auto items-center text-center">
      <h1 className="text-center text-4xl mt-20 mb-3 w-full">plan_ka</h1>
      <p>
        Удобный сервис для трекинга выполнения плана продаж для Вашего бизнеса
      </p>
      <Link to={buildRoute(['barcode'])}>
        <Button value="Сканировать код товара" className="text-blue-500" />
      </Link>
      <div className="fixed bottom-6">
        <Button
          value="Выйти из системы"
          onClick={() => logout()}
        />
      </div>
    </div>
  )
}

export default Home
