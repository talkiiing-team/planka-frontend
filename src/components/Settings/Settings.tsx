import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../ui/Button'
import { buildRoute } from '../../routes/routes'
import useInput from '../../utils/useInput'
import Select, { IOptionModel } from '../../ui/Select'
import settings, { EAnimationTypes } from '../../services/settings/settings'

const Settings = () => {
  const history = useHistory()

  const animation = useInput('')

  useEffect(() => {
    animation.setValue(settings.getOption('animationType'))
  }, [])

  const saveSettings = () => {
    settings.setOptions({
      animationType: animation.value,
    })
    history.push(buildRoute(['leaderboard']))
  }

  return (
    <div className="flex flex-col gap-y-4 mx-auto items-center text-center">
      <h1 className="text-center text-4xl mt-20 mb-3 w-full">Настройки</h1>
      <p className="my-4">Настройте систему "под себя"!</p>
      <Select
        options={EAnimationTypes as unknown as IOptionModel[]}
        model={animation}
        label={'Тип анимации'}
        className="w-full text-left"
      />
      <Button
        value="Сохранить"
        className="text-blue-500"
        onClick={() => saveSettings()}
      />
      <div className="fixed bottom-0 w-full p-6">
        <Button value="Назад" onClick={() => history.goBack()} />
      </div>
    </div>
  )
}

export default Settings
