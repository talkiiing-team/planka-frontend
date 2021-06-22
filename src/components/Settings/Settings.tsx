import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../ui/Button'
import { buildRoute } from '../../routes/routes'
import useInput from '../../utils/useInput'
import Select, { IOptionModel } from '../../ui/Select'
import Footer from '../Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import {
  EAnimationTypes,
  EColorSchemes,
  ENotifyType,
  setOptions,
  SettingsModel,
} from '../../store/settings/settings'
import Modal from '../../ui/Modal/Modal'
import Input from '../../ui/Input'
import backly from '../../services/backly/backly'

const Settings = () => {
  const history = useHistory()
  const [changesSettings, setChangesSettings] = useState(false)
  const [changesUser, setChangesUser] = useState(false)

  const options = useSelector(
    (state: { settings: SettingsModel }) => state.settings.options
  )
  const dispatch = useDispatch()

  const animation = useInput('')
  const colorScheme = useInput('')
  const notifyType = useInput('')

  const userName = useInput('')

  const [showModal, setModal] = useState(false)

  useEffect(() => {
    // Settings
    animation.setValue(options.animationType)
    colorScheme.setValue(options.colorScheme)
    notifyType.setValue(options.notifyingType)

    // User
    userName.setValue(backly.auth.getUser().name)
  }, [])

  useEffect(() => {
    if (
      options.animationType !== animation.value ||
      options.colorScheme !== colorScheme.value ||
      options.notifyingType !== notifyType.value
    ) {
      setChangesSettings(true)
    } else {
      setChangesSettings(false)
    }
  }, [animation.value, colorScheme.value, notifyType.value])

  useEffect(() => {
    if (userName.value !== backly.auth.getUser().name) {
      setChangesUser(true)
    } else {
      setChangesUser(false)
    }
  }, [animation.value, colorScheme.value, notifyType.value])

  const saveSettings = () => {
    console.log('saving...')
    if (
      changesSettings &&
      options.notifyingType !== notifyType.value &&
      notifyType.value === 'telegram'
    ) {
      console.log('trigger')
      setModal(true)
    }

    if (changesSettings) {
      dispatch(
        setOptions({
          animationType: animation.value,
          colorScheme: colorScheme.value,
          notifyingType: notifyType.value,
        })
      )
    }

    if (changesUser) {
      backly.app.service('users').patch(
        {
          query: {
            _id: backly.auth.getUser()._id,
          },
        },
        { name: userName.value }
      )
    }
  }

  return (
    <>
      <div className="flex flex-col space-y-4 mx-auto items-center text-center">
        <h1 className="text-center mt-10 mb-2 w-full">Настройки</h1>
        <h2 className="text-center my-2 w-full">Профиль</h2>
        <Input model={userName} label={'Ваше имя'} className={''} />
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
        <Select
          options={ENotifyType as unknown as IOptionModel[]}
          model={notifyType}
          label={'Тип уведомлений'}
          className="w-full text-left"
          required={true}
        />
        <Button
          value="Сохранить"
          className="text-blue-500"
          onClick={() => saveSettings()}
          disabled={!changesSettings}
        />
        <Footer options={['back']} />
      </div>

      <Modal show={showModal} onClose={() => setModal(false)}>
        <div className="w-full h-76 flex flex-col space-y-2 text-left">
          <h2 className="text-center">Привет!</h2>
          <p>
            Мы заметили что Вы предпочли Telegram, возможно потому, что мы еще
            учимся уведомлять Вас здесь. В любом случае - вы в надежных руках!
          </p>
          <p>Мы советуем прямо сейчас подключиться к боту!</p>
          <p className="text-center">
            Ссылка:{' '}
            <a href={'https://t.me/planka_notify_bot'}>@planka_notify_bot</a>
          </p>
          <p className="text-sm text-gray-600">
            Помните, что только здесь находится официальный бот, все остальное
            может быть подделкой!
          </p>
        </div>
      </Modal>
    </>
  )
}

export default Settings
