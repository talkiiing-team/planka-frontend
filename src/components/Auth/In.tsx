import React, { useState } from 'react'
import useInput from '../../utils/useInput'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import { Link } from 'react-router-dom'
import RLink from '../../ui/RLink'
import backly from '../../services/backly/backly'
import UserModel from '../../models/user.model'
import ErrorLine from '../../ui/ErrorLine'

const In = () => {
  const nickname = useInput('')
  const pass = useInput('')
  const [error, setError] = useState('')

  const login = () => {
    backly.auth.login(
      {
        login: nickname.value,
        password: pass.value,
      },
      (r: UserModel) => {
        backly.auth.login(
          {
            login: nickname.value,
            password: pass.value,
          },
          async () => {
            const res = await backly.app.get('authentication')
            console.log(res)
            backly.app.authentication.setAccessToken(res.accessToken)
          },
          () => {
            console.warn('Authentication after registration failed')
            setError('Unknown error')
          }
        )
      },
      (e: any) => {
        console.warn('Log In is not succeed', e)
        setError(e.message)
      }
    )
  }

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className='text-center'>Войти</h1>
      <div className='flex flex-row gap-x-2 justify-center mb-3'>
        <p>Нет аккаунта?</p>
        <Link to={`/auth/up`}>
          <RLink value='Создать!'/>
        </Link>
      </div>
      <Input model={nickname} label={'Никнейм'} id={'nickname'} />
      <Input model={pass} label={'Пароль'} type={'password'} />
      <Button value={'Войти'} onClick={() => login()} />
      {error && <ErrorLine value={error} />}
    </div>
  )
}

export default In
