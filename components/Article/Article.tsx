import Meta from '../Meta/Meta'
import style from './Article.module.css'

interface ArticleProps {
	article: ArticleServer
}

export default function Article (props: ArticleProps) {
	const { article } = props
	const { content, views, createdAt } = article
	return (
		<article>
			<div className={ style.content }>
				{ content.map(element => {
					return (
						<element.tag key={ Date.now() }>{ element.text }</element.tag>
					)
				}) }
			</div>
			<Meta views={ views } createdAt={ createdAt }/>
		</article>
	)
}