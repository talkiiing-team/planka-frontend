import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../ui/Button'
import { buildRoute } from '../../routes/routes'
import useInput from '../../utils/useInput'
import Select, { IOptionModel } from '../../ui/Select'
import settings, { EAnimationTypes } from '../../services/settings/settings'
import Footer from '../Footer/Footer'

const Settings = () => {
  const history = useHistory()
  const [changes, setChanges] = useState(false)

  const animation = useInput('')

  useEffect(() => {
    animation.setValue(settings.getOption('animationType'))
  }, [])

  useEffect(() => {
    if (settings.state.options.animationType !== animation.value) {
      setChanges(true)
    } else {
      setChanges(false)
    }
  }, [animation.value])

  const saveSettings = () => {
    if (settings.state.options.animationType !== animation.value) {
      settings.setOptions({
        animationType: animation.value,
      })
    }
    history.push(buildRoute([]))
  }

  return (
    <div className="flex flex-col gap-y-4 mx-auto items-center text-center">
      <h1 className="text-center mt-10 mb-2 w-full">Настройки</h1>
      <h2 className="text-center my-2 w-full">Профиль</h2>
      <h2 className="text-center my-2 w-full">Общие</h2>
      <Select
        options={EAnimationTypes as unknown as IOptionModel[]}
        model={animation}
        label={'Тип анимации перехода'}
        className="w-full text-left"
        required={true}
      />
      <Button
        value="Сохранить"
        className="text-blue-500"
        onClick={() => saveSettings()}
        disabled={!changes}
      />
      <Footer options={['back']} />
    </div>
  )
}

export default Settings
