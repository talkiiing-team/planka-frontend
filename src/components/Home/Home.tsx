import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../ui/Button'
import { buildRoute } from '../../routes/routes'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import Footer from '../Footer/Footer'
import UserModel from '../../models/user.model'
import { QrcodeIcon } from '@heroicons/react/outline'

const Home = () => {
  const history = useHistory()

  const [user, setUser] = useState<UserModel>()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') || '{}'))
  }, [])

  // @ts-ignore
  return (
    <>
      <div className="grid grid-flow-row space-y-4 pt-10 justify-items-center">
        <Logo className="mb-2 w-32 select-none" />
        {user ? (
          <>
            <p className="my-2 text-center">
              Удобный сервис для трекинга выполнения плана продаж для Вашего
              бизнеса
            </p>
            <Button
              value="Новости"
              className="text-blue-500"
              onClick={() => history.push(buildRoute(['newsfeed']))}
            />
            <Button
              value="Управлять планами"
              className="text-blue-500"
              onClick={() => history.push(buildRoute(['manage']))}
            />
            <div className={'w-full flex flex-row space-x-2'}>
              <Button
                icon={() => <QrcodeIcon className="w-6 h-6" />}
                value={'Сканнер'}
                className="text-blue-500 w-16"
                onClick={() => history.push(buildRoute(['barcode']))}
              />
              <Button
                value="Мои привязки"
                className="text-blue-500 flex-grow"
                onClick={() => history.push(buildRoute(['bindings']))}
              />
            </div>
            <div className="w-full flex flex-row space-x-2">
              <Button
                value="Достижения"
                className="w-full text-blue-500"
                onClick={() => history.push(buildRoute(['stats']))}
              />
              <Button
                value="Рейтинг"
                className="w-full text-blue-500"
                onClick={() => history.push(buildRoute(['leaderboard']))}
              />
            </div>
          </>
        ) : (
          <p className="my-2 text-center">Загружаем данные...</p>
        )}
      </div>
      <Footer options={['settings', 'quit']} />
    </>
  )
}

export default Home
