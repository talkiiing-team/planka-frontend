import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import backly from '../../services/backly/backly'
import UserModel from '../../models/user.model'
import { Paginated } from '@feathersjs/feathers'
import NewsfeedModel from '../../models/newsfeed.model'

const Newsfeed = () => {
  const [list, setList] = useState<NewsfeedModel[]>()
  const [status, setStatus] = useState('loading')

  const fetchList = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}') as UserModel
    try {
      if (!user.shop) {
        setStatus('no-shop')
        return
      }
      const res = (await backly.app.service('newsfeed').find({
        query: {
          shop: user.shop,
        },
      })) as Paginated<NewsfeedModel>
      setList(res.data)
      setStatus('fetched')
    } catch (e) {
      console.log(e)
      setStatus('error')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="flex flex-col space-y-4 mx-auto items-center text-center">
      <h1 className="text-center text-4xl mt-10 mb-3 w-full">Новости</h1>
      <div className="w-full flex flex-col space-y-5">
        {status === 'loading' ? (
          <div className="w-full text-gray-600 text-xl rounded-md font-light px-3 py-1">
            Загрузка...
          </div>
        ) : list && list.length > 0 ? (
          list.map((v, i) => (
            <div className="w-full px-4 py-3 flex flex-col space-y-2 rounded-lg bg-white shadow-xl">
              <h3 className="text-left">{v.title}</h3>
              <div className={'text-justify'}>{v.text}</div>
            </div>
          ))
        ) : (
          <div className="w-full text-gray-600 text-xl rounded-md font-light px-3 py-1">
            {status === 'no-shop'
              ? 'Не удалось найти у вас запись о магазине'
              : 'Произошла ошибка'}
          </div>
        )}
      </div>
      <Footer options={['settings', 'back']} />
    </div>
  )
}

export default Newsfeed
