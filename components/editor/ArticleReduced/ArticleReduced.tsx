import Meta from '../../Meta/Meta'
import style from './ArticleReduced.module.css'

interface ArticleProps {
	article: ArticleServer
	isEdit?: boolean
}

export default function Article (props: ArticleProps) {
	const { article, isEdit } = props
	const { content, views, createdAt } = article
	return (
		<article 
			onClick={ () => {
				window.location.href = `${ process.env.NEXT_PUBLIC_CLIENT_URL }${ isEdit ? '/admin/edit/' : '/article/' }${ article.id }`
			} }
			className={ style.article }
		>
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