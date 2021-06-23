import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import backly from '../../services/backly/backly'
import UserModel from '../../models/user.model'
import { Paginated } from '@feathersjs/feathers'

const Leaderboard = () => {
  const [list, setList] = useState<UserModel[]>()
  const [filteredList, setFilteredList] = useState<UserModel[]>()

  const fetchList = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}') as UserModel
    try {
      const res = (await backly.app.service('users').find({
        query: {
          shop: user.shop,
        },
      })) as Paginated<UserModel>
      setList(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    setFilteredList(list)
  }, [list])

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="flex flex-col space-y-4 mx-auto items-center text-center">
      <h1 className="text-center text-4xl mt-10 mb-3 w-full">Рейтинг</h1>
      <div className="w-full flex flex-col space-y-5">
        {!list ? (
          <div className="w-full text-gray-600 text-xl rounded-md font-light px-3 py-1">
            Загрузка...
          </div>
        ) : filteredList && filteredList.length > 0 ? (
          filteredList.map((v, i) => (
            <div
              className="w-full ring-1 ring-gray-100 h-10 bg-white
      relative rounded-md shadow-lg flex flex-col px-3 py-2 relative"
            >
              <div className="w-full flex flex-row justify-start">
                <div className="w-12 text-gray-600 text-left select-none">{i}</div>
                <div className="w-full text-left font-bold">{v.name}</div>
                <div className="w-full text-right">{v.role}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-gray-600 text-xl rounded-md font-light px-3 py-1">
            К сожалению, ничего...
          </div>
        )}
      </div>
      <Footer options={['settings', 'back']} />
    </div>
  )
}

export default Leaderboard
