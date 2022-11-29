import Article from '../../components/Article/Article'
import Content from '../../components/Content/Content'
import Head from '../../components/Head'
import Layout from '../../components/Layout'
import ArticleService from '../../services/ArticleService'

interface Props {
	article: ArticleServer | undefined
}

export default function (props: Props) {
	const { article } = props
	return (
		<>
			<Head
				title={ article.title }
				description={ article.description }
				keywords={ article.keywords }
			/>
			<Layout>
				<Content>
					{ article && <Article article={ article }/> }
				</Content>
			</Layout>
		</>
	)
}

export async function getServerSideProps(context) {
	const { id } = context.params
	const response = await ArticleService.getById(id)
	const article = response.data
	return {
	  	props: { article }
	}
}