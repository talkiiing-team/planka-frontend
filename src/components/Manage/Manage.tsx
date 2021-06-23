import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import UserModel from '../../models/user.model'
import useInput from '../../utils/useInput'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import { QrcodeIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'
import { buildRoute } from '../../routes/routes'
import Modal from '../../ui/Modal/Modal'

const Manage = () => {
  const [user, setUser] = useState<UserModel>()
  const [showModal, setModal] = useState(false)

  const formula = useInput('{rec} * 0.45 * ({rec_max} / {all_rec_max})')

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') || '{}'))
  }, [])

  const save = () => {}

  return (
    <>
      <div className="grid grid-flow-row gap-y-4 pt-10 justify-items-center">
        {user && (
          <h1 className="text-center text-4xl mt-12 mb-3 w-full">
            Привет, {user.name}
          </h1>
        )}
        <p className="my-4">Ниже можно настроить формулу рейтинга</p>
        <Input model={formula} label={'Введите формулу здесь'} className={''} />
        <div className={'w-full flex flex-row space-x-2'}>
          <Button
            icon={() => <QuestionMarkCircleIcon className="w-6 h-6" />}
            value={'Помощь'}
            className="text-blue-500 w-16"
            onClick={() => setModal(true)}
          />
          <Button
            value="Сохранить"
            className="text-blue-500 flex-grow"
            onClick={() => save()}
          />
        </div>
      </div>
      <Footer options={['settings', 'back']} />

      <Modal show={showModal} onClose={() => setModal(false)}>
        <div className="w-full h-76 flex flex-col space-y-2 text-left">
          <h2 className="text-center">Помощь</h2>
          <p>
            Для введения формулы просто оберните алиасы на целевые показатели в
            скобки, и сохраните
          </p>
          <div className="text-left flex flex-col space-y-4">
            <div className="flex flex-row space-x-4 justify-between">
              <div className="font-bold w-24">rec</div>
              <div className="w-1/2 text-justify">количество чеков</div>
            </div>
            <div className="flex flex-row space-x-4 justify-between">
              <div className="font-bold w-24">rec_max</div>
              <div className="w-1/2 text-justify">
                максимальное кол-во чеков за последний месяц
              </div>
            </div>
            <div className="flex flex-row space-x-4 justify-between">
              <div className="font-bold w-24">all_rec_avg</div>
              <div className="w-1/2 text-justify">
                среднее количество чеков коллег за день
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Manage
