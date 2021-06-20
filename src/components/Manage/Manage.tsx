import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import UserModel from '../../models/user.model'

const Manage = () => {

  const [user, setUser] = useState<UserModel>()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') || '{}'))
  }, [])

  return (
    <>
      <div className="grid grid-flow-row gap-y-4 pt-10 justify-items-center">
        ЛК: {user?.name}
      </div>
      <Footer options={['settings', 'back']} />
    </>
  )
}

export default Manage
