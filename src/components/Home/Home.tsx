import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../ui/Button'
import { buildRoute } from '../../routes/routes'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import Footer from '../Footer/Footer'

const Home = () => {
  const history = useHistory()

  return (
    <div className="relative flex flex-col gap-y-4 mx-auto items-center text-center">
      <Logo className="text-center text-4xl mt-10 mb-2 w-32 select-none" />
      <p className="my-2">
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
      <Footer options={['settings', 'quit']} />
    </div>
  )
}

export default Home
