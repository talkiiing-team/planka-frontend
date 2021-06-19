import React from 'react'
import useInput from '../../utils/useInput'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import { Link } from 'react-router-dom'
import RLink from '../../ui/RLink'

const In = () => {
  const nickname = useInput('')
  const pass = useInput('')
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
      <Button value={'Войти'} onClick={() => true} />
    </div>
  )
}

export default In
