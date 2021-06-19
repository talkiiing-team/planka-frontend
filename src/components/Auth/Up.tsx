import React from 'react'
import useInput from '../../utils/useInput'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import Select from '../../ui/Select'
import { Link } from 'react-router-dom'
import RLink from '../../ui/RLink'

const roles = [
  { id: 'director', value: 'Управляющий' },
  { id: 'staff', value: 'Сотрудник' },
]


const Up = () => {
  const name = useInput('Vitaly')
  const nickname = useInput('')
  const pass = useInput('')
  const select = useInput('')
  return (
    <div className="flex flex-col gap-y-4">
      <h1 className='text-center'>Форма регистрации</h1>
      <Input model={name} label={'Ваше Имя'} id={'name'} />
      <Input model={nickname} label={'Никнейм'} id={'nickname'} />
      <Input model={pass} label={'Пароль'} type={'password'} />
      <Select model={select} label={'Ваша роль...'} options={roles} />
      <Button value={'Зарегистрироваться'} onClick={() => true} />
      <div className='flex flex-row justify-end gap-x-2'>
        <p>Уже есть аккаунт?</p>
        <Link to={`/auth/in`}>
          <RLink value='Войти'/>
        </Link>
      </div>
    </div>

  )
}

export default Up
