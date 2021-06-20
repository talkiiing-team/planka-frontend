import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../ui/Button'
import { buildRoute } from '../../routes/routes'
// @ts-ignore
import QrReader from 'react-weblineindia-qrcode-scanner'

const Barcode = () => {
  const [code, setCode] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [error, setError] = useState('')
  const [facing, setFacing] = useState('rear')

  const history = useHistory()

  const handleChanges = (newValue: string) => {
    if (newValue && isActive) {
      setCode(newValue)
      setIsActive(false)
    }
  }

  return (
    <div className="flex flex-col gap-y-4 mx-auto items-center text-center">
      <h1 className="text-center text-4xl mt-20 mb-3 w-full">Barcode</h1>
      <p>
        Просканируйте баркод камерой.{' '}
        <span
          onClick={() => setFacing((r) => (r === 'rear' ? 'front' : 'rear'))}
          className="text-blue-500"
        >
          Сменить
        </span>
      </p>
      <div className="object-scale-down h-40 overflow-hidden">
        {isActive ? (
          <QrReader
            style={{
              objectFit: 'scale-down',
              height: '12rem',
              transform: 'translate(0, -2rem)',
            }}
            delay={300}
            onError={(r: any) => {
              console.error('err', r)
              setError(r)
            }}
            facingMode={facing}
            onScan={handleChanges}
          />
        ) : (
          <>
            <p className="font-bold mt-10">Содержимое: {code}</p>
            <div className="flex flex-col items-center mt-5">
              <button
                className="text-blue-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
                onClick={() => {
                  setCode('')
                  setIsActive(true)
                }}
              >
                Повторить заново...
              </button>
            </div>
          </>
        )}
      </div>
      <Button value="Подтвердить" className="text-blue-500" disabled={!code} />
      {error}
      <div className="fixed bottom-0 w-full p-6">
        <Button value="Назад" onClick={() => history.goBack()} />
      </div>
    </div>
  )
}

export default Barcode