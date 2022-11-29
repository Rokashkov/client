import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './article.slice'
import metaReducer from './meta.slice'

const store =  configureStore({
	reducer: { 
		article: articleReducer,
		meta: metaReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store