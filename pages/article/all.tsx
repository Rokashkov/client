import ArticleContainer from '../../components/ArticleContainer'
import Bar from '../../components/Bar/Bar'
import Content from '../../components/Content/Content'
import Head from '../../components/Head'
import Layout from '../../components/Layout'
import Pag from '../../components/Pag/Pag'
import ArticleService from '../../services/ArticleService'
import MetaService from '../../services/MetaService'

interface AllProps {
	articles: ArticleServer[]
	page: number
	limit: number
	total: number
	meta: {
		id: number
		name: string
		title: string
		description: string
		keywords: string[]
	}
}

export default function all (props: AllProps) {
	const { meta, articles, page, limit, total } = props
	return (
		<>
			<Head
				title={ meta.title }
				description={ meta.description }
				keywords={ meta.keywords }
			/>
			<Layout>
				<Content>
					{ articles && <ArticleContainer articles={ articles }/> }
				</Content>
				<Bar>
					{ articles && 
						<Pag
							page={ page }
							limit={ limit }
							total={ total }
							path='/article/all'
						/>
					}	
					</Bar>
			</Layout>
		</>
	)
}

export async function getServerSideProps(context) {
	const { data } = await MetaService.get('all')
	const meta = data
	let { page, limit } = context.query
	page = page ? page : 1
	limit = limit ? limit : 10
	const response = await ArticleService.all({ page, limit })
	const { articles, total } = response.data
	return {
	  	props: { meta, articles, total, page, limit }
	}
}