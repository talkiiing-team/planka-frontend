import React, { useState } from 'react'
import Button from '../../ui/Button'
// @ts-ignore
import QrReader from 'react-weblineindia-qrcode-scanner'
import { RefreshIcon } from '@heroicons/react/outline'
import Footer from '../Footer/Footer'
import backly from '../../services/backly/backly'
import EntityModel, { parseType } from '../../models/entity.model'
import BindingModel from '../../models/binding.model'

const Barcode = () => {
  const [code, setCode] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [error, setError] = useState('')
  const [facing, setFacing] = useState('rear')
  const [scannedEntity, setEntity] = useState<EntityModel>()

  const handleChanges = (newValue: string) => {
    if (newValue && isActive) {
      setCode(newValue)
      setIsActive(false)
    }
  }

  const applyBearing = async () => {
    try {
      const res = (await backly.app.service('bindings').create({
        barcode: code,
      })) as BindingModel
      console.log(res)
      setEntity(res.entity)
    } catch (e) {
      setError('Возможно, такого товара нет')
    }
  }

  return (
    <div className="flex flex-col space-y-4 mx-auto items-center text-center">
      <h1 className="text-center text-4xl mt-10 mb-3 w-full">Сканировать</h1>
      {scannedEntity ? (
        <>
          <p>Скану соответствует:</p>
          <div className="flex flex-col space-y-2">
            <div>{scannedEntity.name}</div>
            <div>Тип: {parseType(scannedEntity.type)}</div>
          </div>
          <div className="flex flex-col items-center mt-5">
            <button
              className="text-blue-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
              onClick={() => {
                setCode('')
                setIsActive(true)
                setEntity(undefined)
              }}
            >
              Добавить еще...
            </button>
          </div>
        </>
      ) : (
        <>
          <p>Наведите камеру на код</p>
          {isActive && (
            <p
              onClick={() =>
                setFacing((r) => (r === 'rear' ? 'front' : 'rear'))
              }
              className="text-blue-500 flex flex-row items-center space-x-2 ring-1
        ring-blue-500 px-2 py-1 text-sm rounded-md hover:bg-blue-50 active:text-white
        transition-all duration-150 cursor-pointer active:bg-blue-500"
            >
              <span className="pointer-events-none ">Сменить камеру</span>
              <RefreshIcon className="w-4 h-4" />
            </p>
          )}
          <div className="object-scale-down max-h-80 overflow-hidden">
            {isActive ? (
              <QrReader
                style={{
                  maxHeight: '40rem',
                  maxWidth: '100%',
                  transform: 'translate(0, -25%)',
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
          <Button
            value="Подтвердить"
            className="text-blue-500"
            disabled={!code}
            onClick={() => applyBearing()}
          />
          {error}
        </>
      )}
      <Footer options={['settings', 'back']} />
    </div>
  )
}

export default Barcode
