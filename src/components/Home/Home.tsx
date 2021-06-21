import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../ui/Button'
import { buildRoute } from '../../routes/routes'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import Footer from '../Footer/Footer'
import UserModel from '../../models/user.model'

const Home = () => {
  const history = useHistory()

  const [user, setUser] = useState<UserModel>()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') || '{}'))
  }, [])

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
            {user.role === 'staff' ? (
              <Button
                value="Сканировать код товара"
                className="text-blue-500"
                onClick={() => history.push(buildRoute(['barcode']))}
              />
            ) : (
              <>
                <Button
                  value="Управлять планами"
                  className="text-blue-500"
                  onClick={() => history.push(buildRoute(['manage']))}
                />
                <Button
                  value="Сканировать код товара"
                  className="text-blue-500"
                  onClick={() => history.push(buildRoute(['barcode']))}
                />
              </>
            )}
            <Button
              value="Мои привязки"
              className="text-blue-500"
              onClick={() => history.push(buildRoute(['bindings']))}
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
