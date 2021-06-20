import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../ui/Button'
import { buildRoute } from '../../routes/routes'
import useInput from '../../utils/useInput'
import Select, { IOptionModel } from '../../ui/Select'
import settings, {
  EAnimationTypes,
  EColorSchemes,
} from '../../services/settings/settings'
import Footer from '../Footer/Footer'

const Settings = () => {
  const history = useHistory()
  const [changes, setChanges] = useState(false)

  const animation = useInput('')
  const colorScheme = useInput('')

  useEffect(() => {
    animation.setValue(settings.getOption('animationType'))
    colorScheme.setValue(settings.getOption('colorScheme'))
  }, [])

  useEffect(() => {
    if (
      settings.state.options.animationType !== animation.value ||
      settings.state.options.colorScheme !== colorScheme.value
    ) {
      setChanges(true)
    } else {
      setChanges(false)
    }
  }, [animation.value, colorScheme.value])

  const saveSettings = () => {
    if (changes) {
      settings.setOptions({
        animationType: animation.value,
        colorScheme: colorScheme.value,
      })
    }
    history.push(buildRoute([]))
  }

  return (
    <div className="flex flex-col space-y-4 mx-auto items-center text-center">
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
      <Select
        options={EColorSchemes as unknown as IOptionModel[]}
        model={colorScheme}
        label={'Цветовая схема'}
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
