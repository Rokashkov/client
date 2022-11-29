import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

const initialState: MetaServer = {
	id: undefined,
	name: undefined,
	title: '',
	description: '',
	keywords: []
}

const metaSlice = createSlice({
	name: 'meta',
	initialState,
	reducers: {
		setMeta: (state, action: PayloadAction<{ meta: MetaServer }>) => {
			const { meta } = action.payload
			const { id, name, title, description, keywords } = meta
			state.id = id
			state.name = name
			state.title = title
			state.description = description
			state.keywords = keywords
		},
		setTitle: (state, action: PayloadAction<{ title: string }>) => {
			const { title } = action.payload
			state.title = title
		},
		setDescription: (state, action: PayloadAction<{ description: string }>) => {
			const { description } = action.payload
			state.description = description
		},
		setKeywords: (state, action: PayloadAction<{ keywords: string[] }>) => {
			const { keywords } = action.payload
			state.keywords = keywords
		},
		pushKeywordsElement: (state, action: PayloadAction<{ keyword: string }>) => {
			const { keyword } = action.payload
			state.keywords.push(keyword)
		},
		setKeywordsElement: (state, action: PayloadAction<{ index: number, keyword: string }>) => {
			const { index, keyword } = action.payload
			state.keywords[index] = keyword
		},
		deleteKeywordsElement: (state, action: PayloadAction<{ index: number }>) => {
			const { index } = action.payload
			state.keywords.splice(index, 1)
		}
	}
})

export const {
	setMeta,
	setTitle,
	setDescription,
	pushKeywordsElement,
	setKeywords,
	setKeywordsElement,
	deleteKeywordsElement
} = metaSlice.actions

export const selectTitle = (state: RootState) => state.meta.title
export const selectDescription = (state: RootState) => state.meta.description
export const selectKeywords = (state: RootState) => state.meta.keywords

export default metaSlice.reducer