import Article from '../../components/editor/Article/Article'
import Content from '../../components/Content/Content'
import Head from '../../components/Head'
import Layout from '../../components/Layout'
import { useCheck } from '../../hooks/useCheck'
import Title from '../../components/editor/Title/Title'
import Description from '../../components/editor/Description/Description'
import Keywords from '../../components/editor/Keywords/Keywords'
import Bar from '../../components/Bar/Bar'
import Button from '../../components/editor/Button/Button'
import ArticleService from '../../services/ArticleService'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux.hooks'

export default function Create () {
	const article = useAppSelector((state) => state.article)
	useCheck()
	const [fetching, useFetching] = useState(false)
	const [err, useErr] = useState(undefined)
	useEffect(() => {
		if (fetching) {
			ArticleService.create(article as ArticleClient)
				.then((response) => {
					window.location.href = `${ process.env.NEXT_PUBLIC_CLIENT_URL }/article/${ response.data.id }`
				} )
				.catch((err) => useErr(err))
				.finally(() => useFetching(false))
		}
	}, [fetching])
	return (
		<>
			<Head
				title='Создать статью'
			/>
			<Layout>
				<Content>
					<Title/>
					<Description/>
					<Keywords/>
					<Article/>
					{ err && <p style={ {alignSelf: 'center'} }>Произошла ошибка :{ '(' }</p> }
				</Content>
				<Bar>
					<Button
						className='create-article'
						onClick={ () => {
							useErr(false)
							useFetching(true)
						}}
					>
						Создать статью
					</Button>
				</Bar>
			</Layout>
		</>
	)
}