import React, { useState } from 'react'
import useInput from '../../utils/useInput'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

const In = () => {
  const nickname = useInput('')
  const pass = useInput('')
  return (
    <div className="flex flex-col gap-y-4">
      <Input model={nickname} label={'Никнейм'} id={'nickname'} />
      <Input model={pass} label={'Пароль'} type={'password'} />
      <Button value={'Войти'} onClick={() => true} />
    </div>
  )
}

export default In
