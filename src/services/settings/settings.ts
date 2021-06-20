import { Component, useState } from 'react'

export interface IAnimationType {
  id: string
  value: string
}

export const EAnimationTypes: IAnimationType[] = [
  { id: 'none', value: 'None' },
  { id: 'slide', value: 'Slide' },
  { id: 'flight', value: 'Flight' },
]

export const useAnimationType = (defaultValue: IAnimationType['id']) => {
  const [animation, set] = useState(
    EAnimationTypes.find((v) => v.id === defaultValue) || EAnimationTypes[0]
  )

  const setAnimation = (animationName: IAnimationType['id']) => {
    set(
      EAnimationTypes.find((v) => v.id === animationName) || EAnimationTypes[0]
    )
  }
  return { animation, setAnimation }
}

export interface SettingsModel extends Record<string, any> {
  animationType: IAnimationType['id']
  colorScheme: string
}

class Settings extends Component{
  options: SettingsModel
  storageKey = 'settings'

  constructor(props?: any) {
    super(props)
    const temp = localStorage.getItem(this.storageKey)
    if (temp) {
      this.options = JSON.parse(temp) as SettingsModel
    } else {
      this.options = {
        animationType: 'flight',
        colorScheme: 'light',
      }
    }
  }

  public getOption = (optionName: string) =>
    Object(this.options).hasOwnProperty(optionName)
      ? this.options[optionName]
      : undefined

  public setOptions = (newOptions: Partial<SettingsModel>) => {
    this.options = Object.assign(this.options, newOptions)
  }
}

const settingsInstance = new Settings()

export default settingsInstance
