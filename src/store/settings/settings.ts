import { createSlice } from '@reduxjs/toolkit'

export const StorageKeySettings = 'settings'

export interface IOptionForm {
  id: string
  value: string
}

export const EAnimationTypes: IOptionForm[] = [
  { id: 'none', value: 'Нет' },
  { id: 'slide', value: 'Сдвиг' },
  { id: 'flight', value: 'Вылет' },
  { id: 'flightHard', value: 'Большой вылет' },
]

export const EColorSchemes: IOptionForm[] = [
  { id: 'default', value: 'По умолчанию' },
  { id: 'light', value: 'Светлая' },
  { id: 'dark', value: 'Темная' },
]

export const ENotifyType: IOptionForm[] = [
  { id: 'push', value: 'Браузер' },
  { id: 'telegram', value: 'Telegram' },
  { id: 'none', value: 'Без уведомлений' },
]

export interface SettingsModel extends Record<string, any> {
  options: {
    animationType: IOptionForm['id']
    colorScheme: IOptionForm['id']
    notifyingType: IOptionForm['id']
  }
  isReady: boolean
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    options: {
      animationType: 'flight',
      colorScheme: 'light',
      notifyingType: 'push',
    },
    isReady: false,
  },
  reducers: {
    setOptions: (state, action) => {
      state.options = Object.assign(state.options, action.payload)
      localStorage.setItem(StorageKeySettings, JSON.stringify(state))
    },
    /*increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },*/
  },
})

// Action creators are generated for each case reducer function
export const { setOptions } = settingsSlice.actions

export default settingsSlice.reducer
