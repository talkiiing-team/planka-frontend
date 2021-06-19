import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button'
import { buildRoute } from '../../routes/routes'

const Barcode = () => {
  return (
    <div className="flex flex-col gap-y-4 mx-auto items-center text-center">
      <h1 className="text-center text-4xl mt-20 mb-3 w-full">Barcode</h1>
      <p>
        Просканируйте баркод камерой
      </p>
      <Button value="Подтвердить" className="text-blue-500" disabled={true}/>
      <Link to={buildRoute([])}>
        <Button value="Назад" className="text-blue-500" />
      </Link>
    </div>
  )
}

export default Barcode
