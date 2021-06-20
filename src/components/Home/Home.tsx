import React from 'react'
import { useHistory } from 'react-router-dom'
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
      <p className="my-4">
        Удобный сервис для трекинга выполнения плана продаж для Вашего бизнеса
      </p>
      <Button
        value="Сканировать код товара"
        className="text-blue-500"
        onClick={() => history.push(buildRoute(['barcode']))}
      />
      <Button
        value="Достижения"
        className="text-blue-500"
        onClick={() => history.push(buildRoute(['stats']))}
      />
      <Button
        value="Рейтинг"
        className="text-blue-500"
        onClick={() => history.push(buildRoute(['leaderboard']))}
      />
      <div className="fixed bottom-0 w-full p-6">
        <p
          onClick={() => history.push(buildRoute(['settings']))}
          className="text-blue-500 mb-2"
        >
          Настройки
        </p>
        <Button value="Выйти из системы" onClick={() => logout()} />
      </div>
    </div>
  )
}

export default Home
