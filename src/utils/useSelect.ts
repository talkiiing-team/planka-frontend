import { ChangeEvent, useState } from 'react'

export interface IUseSelect<T> {
  bind: {
    onChange: (
      e: ChangeEvent<HTMLSelectElement>
    ) => any
    value: T
  }
  setValue: (newValue: T) => any
  reset: () => any
  value: T
}

// WIP
const useSelect = <T>(defaultValue: T): IUseSelect<T> => {
  const [value, setValue] = useState<T>(defaultValue)
  return {
    value,
    setValue: (newValue) => setValue(newValue),
    reset: () => setValue(defaultValue),
    bind: {
      onChange: (
        e: ChangeEvent<HTMLSelectElement>
      ) => setValue((e.target.value ? e.target.value : (e as unknown)) as T),
      value: value,
    },
  }
}

export default useSelect
