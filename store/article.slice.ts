import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

const initialState: ArticleServer = {
	id: undefined,
	content: [],
	title: '',
	description: '',
	keywords: [],
	views: undefined,
	createdAt: undefined,
	updatedAt: undefined
}

const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {
		setArticle: (state, action: PayloadAction<{ article: ArticleServer }>) => {
			const { article } = action.payload
			const {
				id,
				content,
				title,
				description,
				keywords,
				views,
				createdAt,
				updatedAt
			} = article
			state.id = id
			state.content = content
			state.title = title
			state.description = description
			state.keywords = keywords
			state.views = views
			state.createdAt = createdAt
			state.updatedAt = updatedAt
		},
		setContent: (state, action: PayloadAction<{ content: content }>) => {
			const { content } = action.payload
			state.content = content
		},
		pushContentElement: (state, action: PayloadAction<{ element: { tag: tag, text: string } }>) => {
			const { element } = action.payload
			state.content.push(element)
		},
		setContentElement: (state, action: PayloadAction<{ index: number, element: { tag: tag, text: string } }>) => {
			const { index, element } = action.payload
			state.content[index] = element
		},
		deleteContentElement: (state, action: PayloadAction<{ index: number }>) => {
			const { index } = action.payload
			state.content.splice(index, 1)
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
	setArticle,
	setContent,
	pushContentElement,
	setContentElement,
	deleteContentElement,
	setTitle,
	setDescription,
	pushKeywordsElement,
	setKeywords,
	setKeywordsElement,
	deleteKeywordsElement
} = articleSlice.actions

export const selectContent = (state: RootState) => state.article.content
export const selectTitle = (state: RootState) => state.article.title
export const selectDescription = (state: RootState) => state.article.description
export const selectKeywords = (state: RootState) => state.article.keywords

export default articleSlice.reducer