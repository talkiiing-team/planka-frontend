import React, { useState } from 'react'
import useInput from '../../utils/useInput'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import Select from '../../ui/Select'
import { Link, useHistory } from 'react-router-dom'
import RLink from '../../ui/RLink'
import backly from '../../services/backly/backly'
import UserModel from '../../models/user.model'
import ErrorLine from '../../ui/ErrorLine'

const roles = [
  { id: 'director', value: 'Управляющий' },
  { id: 'staff', value: 'Сотрудник' },
]

const Up = () => {
  const name = useInput('')
  const nickname = useInput('')
  const pass = useInput('')
  const select = useInput('')
  const [error, setError] = useState('')

  const history = useHistory()

  const register = () => {
    backly.auth.register(
      {
        name: name.value,
        login: nickname.value,
        password: pass.value,
        role: select.value,
      },
      (r: UserModel) => {
        backly.auth.login(
          {
            login: nickname.value,
            password: pass.value,
          },
          async () => {
            const res = await backly.app.get('authentication')
            backly.app.authentication.setAccessToken(res.accessToken)
            history.replace('/')
          },
          () => {
            console.warn('Authentication after registration failed')
            setError('Unknown error')
          }
        )
      },
      (e: any) => {
        console.warn('Register is not succeed', e)
        setError(e.message)
      }
    )
  }

  return (
    <div className="flex flex-col space-y-4 items-center">
      <h1 className="text-center">Регистрация</h1>
      <div className="flex flex-row justify-center space-x-2 mb-3">
        <p>Уже есть аккаунт?</p>
        <Link replace to={`/auth/in`}>
          <RLink value="Войти" />
        </Link>
      </div>
      <Input
        model={name}
        label={'Ваше Имя'}
        id={'name'}
        onKeyPress={() => register()}
      />
      <Input
        model={nickname}
        label={'Никнейм'}
        id={'nickname'}
        onKeyPress={() => register()}
      />
      <Input
        model={pass}
        label={'Пароль'}
        type={'password'}
        onKeyPress={() => register()}
      />
      <Select
        model={select}
        label={'Ваша роль...'}
        options={roles}
        className={'w-full'}
      />
      <Button value={'Зарегистрироваться'} onClick={() => register()} />
      {error && <ErrorLine value={error} />}
    </div>
  )
}

export default Up
