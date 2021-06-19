import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button'
import { buildRoute } from '../../routes/routes'

const Home = () => {
  return (
    <div className="flex flex-col gap-y-4 mx-auto items-center text-center">
      <h1 className="text-center text-4xl mt-20 mb-3 w-full">plan_ka</h1>
      <p>
        Удобный сервис для трекинга выполнения плана продаж для Вашего бизнеса
      </p>
      <Link to={buildRoute(['barcode'])}>
        <Button value="Сканировать Barcode" className="text-blue-500" />
      </Link>
    </div>
  )
}

export default Home
