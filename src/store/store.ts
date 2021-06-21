import { configureStore } from '@reduxjs/toolkit'
import { settingsSlice } from './settings/settings'

export default configureStore({
  reducer: {
    settings: settingsSlice.reducer
  },
})
