import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import counterReducer from './counter.slice'

const store =  configureStore({
	reducer: {
		counter: counterReducer,
		[api.reducerPath]: api.reducer
	},
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store