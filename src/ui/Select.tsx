import React, { useEffect, useState } from 'react'
import { IUseInput } from '../utils/useInput'

interface IOptionModel {
  id: string
  value: string
}

interface ISelectProps {
  model: IUseInput<string>
  className?: string
  label?: string
  options: IOptionModel[]
}

interface IOptionProps {
  id?: string
  value?: string
  onClick?: () => any
  className?: string
}

const SelectOption = (props: IOptionProps) => {
  return (
    <div
      className={`${props.className} px-4 py-3 hover:bg-gray-50 transition-all duration-100 
          active:bg-gray-100 cursor-pointer select-none outline-none focus:outline-none focus:bg-gray-100`}
      onClick={() => props.onClick && props.onClick()}
      tabIndex={1}
    >
      {props.value || props.id || ''}
    </div>
  )
}

function Select(props: ISelectProps) {
  const [labelState, setLabelState] = useState<boolean>(false)
  const [layPaper, setLayPaper] = useState<boolean>(false)
  const [sOption, setSOption] = useState<IOptionModel | undefined>()

  useEffect(() => {
    if (sOption) {
      props.model.setValue(sOption.id)
      setLabelState(true)
    } else {
      props.model.reset()
      setLabelState(false)
    }
  }, [sOption])

  useEffect(() => {
    setSOption(props.options.find((v) => props.model.bind.value === v.id))
  }, [props.model.bind.value])

  const toggleForced = (forceValue: boolean) => {
    setLayPaper(forceValue)
  }

  return (
    <>
      {layPaper && (
        <div
          className="h-screen w-screen bg-black opacity-10 fixed top-0 left-0"
          onClick={() => toggleForced(false)}
        />
      )}
      <div className={`${props.className} relative`}>
        <div
          className={`w-full paper ring-1 ring-gray-100 
      relative rounded-md flex flex-col focus-within:w-1/2`}
        >
          {props.label && (
            <label
              className={`transform text-gray-400 transition-all duration-50 
          absolute mx-4 pointer-events-none 
          select-none ${labelState ? 'text-xs mt-1.5' : 'text mt-3'}`}
            >
              {props.label}
            </label>
          )}
          <div
            className={`w-full paper h-12 px-4 text rounded-md bg-gray-50 
           hover:bg-gray-100 focus:bg-gray-100 ${
             sOption ? 'shadow-inner' : 'shadow-inner'
           }
           outline-none focus:outline-none 
           transition-all duration-100 ${props.label ? 'pt-5 pb-1.5' : 'py-3'}`}
            tabIndex={0}
            onClick={() => toggleForced(true)}
          >
            {props.options.find((v) => props.model.bind.value === v.id)
              ?.value || ''}
          </div>
        </div>
        <div
          className={`paper w-full bg-white shadow-2xl absolute rounded-md 
      ring-1 ring-gray-200 overflow-hidden transition-all duration-150
       ${layPaper ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'} ${
            sOption ? '-mt-18' : '-mt-12'
          }`}
        >
          {sOption ? (
            <>
              <div
                className={
                  'h-6 text-xs px-3 text-gray-600 bg-gray-100 py-1 select-none'
                }
                key={'label'}
              >
                {props.label || 'Select one'}
                <span
                  className={'ml-4 underline cursor-pointer'}
                  onClick={() => {
                    setSOption(undefined)
                  }}
                >
                  Unselect
                </span>
              </div>
              <SelectOption
                id={sOption.id}
                key={-1}
                value={sOption.value}
                onClick={() => {
                  toggleForced(false)
                }}
              />
            </>
          ) : (
            <SelectOption
              id={''}
              key={-2}
              value={props.label || 'Select one'}
              onClick={() => {
                toggleForced(false)
              }}
              className={'text-gray-400'}
            />
          )}
          {props.options.map((v, i) => {
            return !sOption || sOption.id !== v.id ? (
              <SelectOption
                id={v.id}
                key={v.id}
                value={v.value}
                onClick={() => {
                  setSOption(v)
                  toggleForced(false)
                }}
              />
            ) : (
              <></>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Select
