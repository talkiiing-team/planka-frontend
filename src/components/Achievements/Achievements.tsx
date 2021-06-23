import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../ui/Button'
import UserModel from '../../models/user.model'
import DoughnutChart, {
  DoughnutDaily,
  DoughnutDone,
  DoughnutReceipts,
} from './Charts/Doughnut'
import Footer from '../Footer/Footer'

const motivations = [
  'Бесконечность не предел!',
  'Без труда не вытащишь и рыбку...',
  'Любишь кататься - люби и саночки возить',
]

const Achievements = () => {
  const history = useHistory()
  const [user, setUser] = useState<UserModel>()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') || '{}'))
  }, [])

  return (
    <div className="flex flex-col gap-y-4 mx-auto items-center text-center pb-16">
      {user && (
        <h1 className="text-center text-4xl mt-12 mb-3 w-full">
          Привет, {user.name}
        </h1>
      )}
      <p className="my-4">
        Здесь ты можешь увидеть свои достижения!{' '}
        {motivations[Math.floor(Math.random() * 10000) % motivations.length]}
      </p>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <p>План на сегодня</p>
          <DoughnutDaily />
        </div>
        <div className="flex flex-col space-y-2">
          <p>План на магазин</p>
          <DoughnutReceipts />
        </div>
      </div>
      <Footer options={['settings', 'back']} />
    </div>
  )
}

export default Achievements
