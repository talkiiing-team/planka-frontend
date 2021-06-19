import React from 'react'
import { Link } from 'react-router-dom'
import RLink from '../../ui/RLink'
import Button from '../../ui/Button'

const Home = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className='text-2xl mx-auto flex flex-row'>
        <h1 className='text-center mt-20 mb-3 w-full'>plan_ka</h1>
        <p>Удобный сервис для трекинга выполнения плана продаж товаров, акссесуаров и услуг</p>
        <Link to={`/auth/up`}><Button value='Регистрация'/> </Link>
        <Link to={`/auth/in`}><Button value='Вход'/></Link>
      </div>
    </div>
  )
}

export default Home
