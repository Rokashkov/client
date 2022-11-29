import { useEffect, useState } from 'react'
import Bar from '../../../../components/Bar/Bar'
import Content from '../../../../components/Content/Content'
import Button from '../../../../components/editor/Button/Button'
import Keywords from '../../../../components/editor/KeywordsMeta/Keywords'
import TextareaEditable from '../../../../components/editor/TextareaEditable/TextareaEditable'
import Head from '../../../../components/Head'
import Layout from '../../../../components/Layout'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hooks'
import { useCheck } from '../../../../hooks/useCheck'
import MetaService from '../../../../services/MetaService'
import { setTitle, setDescription, setKeywords, selectTitle, selectDescription } from '../../../../store/meta.slice'

export default function Meta () {
	useCheck()
	const dispatch = useAppDispatch()
	const { title, keywords, description } = useAppSelector((state) => state.meta)
	useEffect(() => {
		MetaService.get('main')
			.then(({ data }) => {
				const { title, description, keywords } = data
				dispatch(setTitle({ title }))
				dispatch(setDescription({ description }))
				dispatch(setKeywords({ keywords }))
			})
	}, [])
	const [err, useErr] = useState(undefined)
	const [isFetching, useFetching] = useState(false)
	useEffect(() => {
		if (isFetching) {
			MetaService.update({ name: 'main', title, description, keywords })
				.then((response) => {
					if (response.status >= 400) {
						useErr(response.data)
					} else {
						window.location.href = `${ process.env.NEXT_PUBLIC_CLIENT_URL }`
					}
				})
				.catch((err) => useErr(err.response))
				.finally(() => useFetching(false))
		}
	}, [isFetching])
	return (
		<>
			<Head
				title='Метатеги /'
			/>
			<Layout>
				<Content>
					<p>Мететеги /</p>
					<TextareaEditable actionCreator={ setTitle } selector={ selectTitle }>Заглавие</TextareaEditable>
					<TextareaEditable actionCreator={ setDescription } selector={ selectDescription }>Описание</TextareaEditable>
					<Keywords></Keywords>
					{ err && <p>Произошла ошибка :{ '(' }</p> }
				</Content>
				<Bar>
					<Button
						className='create-article'
						onClick={ () => {
							useErr(undefined)
							useFetching(true)
						}}
					>
						Обновить метатеги
					</Button>
				</Bar>
			</Layout>
		</>
	)
}