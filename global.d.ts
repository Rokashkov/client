declare namespace NodeJS {
	interface ProcessEnv {
		API_URL: string
		CLIENT_URL: string
		NEXT_PUBLIC_CLIENT_URL: string
	}
}

type tag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type content = { tag: tag, text: string }[]

interface ArticleClient {
	id: number
	title: string
	description: string
	keywords: string[]
	content: content
}

interface ArticleServer extends ArticleClient {
	views: number
	createdAt: Date
	updatedAt: Date
}

interface MetaClient {
	name: string
	title: string
	description: string
	keywords: string[]
}

interface MetaServer extends MetaClient {
	id: number
}