import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type tag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type content = { tag: tag, text: string }[]

interface Article {
    id: number,
    title: string,
    description: string,
    keywords: string[],
    content: content,
    createdAt: string
    updatedAt: string
}

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
	tagTypes: ['Articles'],
	endpoints: (build) => {
		return {
			getArticle: build.query<Article, { id: number }>({
				query: (arg) => {
					return {
						url: `article/${ arg.id }`
					}
				}
			})
		}
	},
})

export const { useGetArticleQuery } = api