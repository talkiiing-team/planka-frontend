import { createSlice } from '@reduxjs/toolkit'
import { notificationService } from '../../services/notifications/notifications'

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

const handler = (state: SettingsModel) => {
  notificationService.canNotify = state.options.notifyingType === 'push';
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
      state.options = { ...state.options, ...action.payload }
      localStorage.setItem(StorageKeySettings, JSON.stringify(state))
      handler(state as SettingsModel)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setOptions } = settingsSlice.actions

export default settingsSlice.reducer
