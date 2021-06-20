import { Component, useState } from 'react'

export interface IAnimationType {
  id: string
  value: string
}

export const EAnimationTypes: IAnimationType[] = [
  { id: 'none', value: 'Нет' },
  { id: 'slide', value: 'Сдвиг' },
  { id: 'flight', value: 'Вылет' },
  { id: 'flightHard', value: 'Большой вылет' },
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

class Settings extends Component<
  {},
  { options: SettingsModel; isReady: boolean }
> {
  storageKey = 'settings'
  state = {
    options: {
      animationType: 'flight',
      colorScheme: 'light',
    },
    isReady: false,
  }

  constructor(props?: any) {
    super(props)

    const temp = localStorage.getItem(this.storageKey)
    if (temp) {
      this.setState({
        options: JSON.parse(temp) as SettingsModel,
        isReady: true,
      })
    } else {
      this.setState({
        options: {
          animationType: 'flight',
          colorScheme: 'light',
        },
        isReady: true,
      })
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.state.options))
    //setInterval(() => console.log(this.state.options.animationType), 1000)
  }

  public getOption = (optionName: string) =>
    Object(this.state.options).hasOwnProperty(optionName)
      ? // @ts-ignore
        this.state.options[optionName]
      : undefined

  public setOptions = (newOptions: Partial<SettingsModel>) => {
    this.state &&
      this.setState({
        options: Object.assign(this.state.options, newOptions),
      })
    localStorage.setItem(this.storageKey, JSON.stringify(this.state.options))
  }
}

const settingsInstance = new Settings()

export default settingsInstance
