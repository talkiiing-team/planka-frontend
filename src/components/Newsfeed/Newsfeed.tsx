import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import backly from '../../services/backly/backly'
import BindingModel from '../../models/binding.model'
import UserModel from '../../models/user.model'
import { Paginated } from '@feathersjs/feathers'

const Newsfeed = () => {
  const [list, setList] = useState<BindingModel[]>()

  const fetchList = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}') as UserModel
    try {
      const res = (await backly.app.service('newsfeed').find({
        query: {
          user: user._id,
        },
      })) as Paginated<BindingModel>
      setList(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="flex flex-col space-y-4 mx-auto items-center text-center">
      <h1 className="text-center text-4xl mt-10 mb-3 w-full">
        Новости
      </h1>
      <div className="w-full flex flex-col space-y-5">
        {!list || list.length === 0 ? (
          <div className="w-full text-gray-600 text-xl rounded-md font-light px-3 py-1">
            Загрузка...
          </div>
        ) : (
          list.map(
            (v, i) => <div>{i}</div>
          )
        )}
      </div>
      <Footer options={['settings', 'back']} />
    </div>
  )
}

export default Newsfeed
