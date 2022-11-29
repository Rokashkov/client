import Bar from '../../components/Bar/Bar'
import Content from '../../components/Content/Content'
import ArticleContainer from '../../components/editor/ArticleContainer/ArticleContainer'
import Head from '../../components/Head'
import Layout from '../../components/Layout'
import Pag from '../../components/Pag/Pag'
import { useCheck } from '../../hooks/useCheck'
import ArticleService from '../../services/ArticleService'

interface Props {
	articles: ArticleServer[]
	page: number | 1
	limit: number | 10
	total: number
}

export default function (props: Props) {
	useCheck()
	const { articles, page, limit, total } = props
	return (
		<>
			<Head
				title='Выбор статьи'
			/>
			<Layout>
				<>
					<Content>
						{ articles && <ArticleContainer articles={ articles }/> }
					</Content>
					<Bar>
						{ articles && 
							<Pag
								page={ page }
								limit={ limit }
								total={ total }
								path='/admin/edit'
							/>
						}
					</Bar>
				</>
			</Layout>
		</>
	)
}

export async function getServerSideProps(context) {
	let { page, limit } = context.query
	page = page ? page : 1
	limit = limit ? limit : 10
	const response = await ArticleService.all({ page, limit })
	const { articles, total } = response.data
	return {
	  	props: { articles, total, page, limit }
	}
}