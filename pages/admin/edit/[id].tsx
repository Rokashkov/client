import { useEffect, useState } from 'react'
import Bar from '../../../components/Bar/Bar'
import Content from '../../../components/Content/Content'
import Article from '../../../components/editor/Article/Article'
import Button from '../../../components/editor/Button/Button'
import Description from '../../../components/editor/Description/Description'
import Keywords from '../../../components/editor/Keywords/Keywords'
import Title from '../../../components/editor/Title/Title'
import ToolBar from '../../../components/editor/ToolBar/ToolBar'
import Head from '../../../components/Head'
import Layout from '../../../components/Layout'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks'
import { useCheck } from '../../../hooks/useCheck'
import ArticleService from '../../../services/ArticleService'
import { setArticle } from '../../../store/article.slice'

interface Props {
	article: ArticleServer
}

export default function (props: Props) {
	useCheck()
	const { article } = props
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(setArticle({ article: { ...article } }))
	}, [])
	const [isUpdate, useUpdate] = useState(false)
	const [isDelete, useDelete] = useState(false)
	const [err, useErr] = useState(undefined)
	const storeArticle = useAppSelector((state) => state.article)
	useEffect(() => {
		if (isUpdate) {
			ArticleService.update({ id: article.id, ...storeArticle })
				.then((response) => {
					if (response.status >= 400) {
						useErr(response.data)
					} else {
						window.location.href = `${ process.env.NEXT_PUBLIC_CLIENT_URL }/article/${ response.data.id }`
					}
				} )
				.catch((err) => useErr(err.response))
				.finally(() => useUpdate(false))
		}
	}, [isUpdate])
	useEffect(() => {
		if (isDelete) {
			ArticleService.delete(article.id)
				.then((response) => {
					if (response.status >= 400) {
						useErr(response.data)
					} else {
						window.location.href = `${ process.env.NEXT_PUBLIC_CLIENT_URL }/admin/edit`
					}
				} )
				.catch((err) => useErr(err.response))
				.finally(() => useUpdate(false))
		}
	}, [isDelete])
	return (
		<>
			<Head
				title='Обновить статью'
			/>
			<Layout>
				<Content>
					<Title/>
					<Description/>
					<Keywords/>
					<Article/>
					{ err && <p>Произошла ошибка :{ '(' }</p> }
				</Content>
				<Bar>
					<ToolBar>
						<Button
							className='create-article'
							onClick={ () => {
								if (!isUpdate && !isDelete) {
									useUpdate(true)
									useErr(undefined)
								}
							} }
						>
							Обновить статью
						</Button>
						<Button
							className='delete-article'
							onClick={ () => {
								if (!isUpdate && !isDelete) {
									useDelete(true)
									useErr(undefined)
								}
							} }
						>
							Удалить статью
						</Button>
					</ToolBar>
				</Bar>
			</Layout>
		</>
	)
}

export async function getServerSideProps(context) {
	const { id } = context.params
	const response = await ArticleService.getById(id)
	if (response.status >= 400) {
		return {
			props: { err: response.data || response }
		}
	}
	const article = response.data
	return {
	  	props: { article }
	}
}