import ArticleReduced from "../ArticleReduced/ArticleReduced"


interface ArticleContainerProps {
	articles: ArticleServer[]
}

export default function ArticleContainer (props: ArticleContainerProps) {
	const { articles } = props
	return (
		<>
			{ articles.map(article => <ArticleReduced key={ article.id } article={ article } isEdit/> ) }
		</>
	)
}