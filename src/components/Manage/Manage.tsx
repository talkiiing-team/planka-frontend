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
      <div className="grid grid-flow-row gap-y-4 justify-items-center pt-10">
        {user && (
          <h1 className="mt-12 mb-3 w-full text-4xl text-center">
            Привет, {user.name}
          </h1>
        )}
        <p className="my-4">Ниже можно настроить формулу рейтинга</p>
        <Input model={formula} label={'Введите формулу здесь'} className={''} />
        <div className={'w-full flex flex-row space-x-2'}>
          <Button
            icon={() => <QuestionMarkCircleIcon className="w-6 h-6" />}
            value={'Помощь'}
            className="text-blue-500"
            onClick={() => setModal(true)}
          />
          <Button
            value="Сохранить"
            className="text-blue-500"
            onClick={() => save()}
          />
        </div>
      </div>
      <Footer options={['settings', 'back']} />

      <Modal show={showModal} onClose={() => setModal(false)}>
        <div className="flex flex-col space-y-2 w-full text-left h-76">
          <h2 className="text-center">Помощь</h2>
          <p>
            Для введения формулы просто оберните алиасы на целевые показатели в
            скобки, и сохраните
          </p>
          <div className="flex flex-col space-y-4 text-left">
            <div className="flex flex-row justify-between space-x-4">
              <div className="w-24 font-bold">rec</div>
              <div className="w-1/2 text-justify">количество чеков</div>
            </div>
            <div className="flex flex-row justify-between space-x-4">
              <div className="w-24 font-bold">rec_max</div>
              <div className="w-1/2 text-justify">
                максимальное кол-во чеков за последний месяц
              </div>
            </div>
            <div className="flex flex-row justify-between space-x-4">
              <div className="w-24 font-bold">all_rec_avg</div>
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
