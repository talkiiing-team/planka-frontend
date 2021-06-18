import React, { useState } from 'react'

export interface IUseInput<T> {
  bind: {
    onChange: (
      e: HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
    ) => any
    value: [T, React.Dispatch<React.SetStateAction<T>>][0]
  }
  setValue: (newValue: T) => any
  reset: () => any
  value: [T, React.Dispatch<React.SetStateAction<T>>][0]
}

const useInput = <T>(defaultValue: T): IUseInput<T> => {
  const [value, setValue] = useState<T>(defaultValue)
  return {
    value,
    setValue: (newValue) => setValue(newValue),
    reset: () => setValue(defaultValue),
    bind: {
      onChange: (
        e: HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
      ) => setValue((e.value ? e.value : (e as unknown)) as T),
      value: value,
    },
  }
}

export default useInput
