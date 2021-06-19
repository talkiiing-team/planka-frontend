import React, { useState } from 'react'
import Button from './ui/Button'
import Input from './ui/Input'
import useInput from './utils/useInput'
import Select from './ui/Select'

const options = [
  { id: 'one', value: 'First Value' },
  { id: 'two', value: 'Second Value' },
  { id: 'three', value: 'Third Value' },
]

const App = () => {
  const [counter, setCounter] = useState(0)
  const name = useInput('')
  const email = useInput('')
  const pass = useInput('')
  const select = useInput('')
  return (
    <div className="p-6">
      <div>
        <Button
          value={'Registration'}
        />
        <Button
          value={'Log in'}

          />
      </div>
      <header className="flex flex-col gap-y-4">
        <Input model={name} label={'Name'} />
        <Input model={email} label={'E-Mail'} id={'email'} />
        <Input model={pass} label={'Password'} type={'password'} />
        <Select
          model={select}
          label={'Select your option...'}
          options={options}
        />

        <Button
          value={'Open Page ' + counter}
          onClick={() => setCounter((v) => v + 1)}
        />
      </header>
    </div>
  )
}

export default App
