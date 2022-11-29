import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks'
import { deleteKeywordsElement, setKeywordsElement, selectKeywords } from '../../../store/article.slice'
import Button from '../Button/Button'
import Textarea from '../Textarea/Textarea'
import ToolBar from '../ToolBar/ToolBar'
import style from './TextareaKeywords.module.css'

interface TextareaKeywordsProps {
	index?: number
}

export default function TextareaKeywords (props: TextareaKeywordsProps) {
	const { index } = props
	const dispatch = useAppDispatch()
	const keywords = useAppSelector(state => selectKeywords(state))
	const keyword = keywords[index]
	const [isEdit, useEdit] = useState<boolean>(false)
	const [keywordNew, useKeywordNew] = useState<string>(keyword)
	useEffect(() => {
		useKeywordNew(keyword)
	}, [keywords[index]])
	return (
		<>
			<Textarea
				value={ keywordNew }
				tag={ 'p' }
				onChange={ (e) => useKeywordNew(e.target.value) }
				onClick={ () => useEdit(true) }
			></Textarea>
			{ isEdit &&
				<ToolBar>
					<Button
						className='confirm'
						onClick={ () => {
							if (keywords.indexOf(keywordNew) === -1) {
								dispatch(setKeywordsElement({
									index,
									keyword: keywordNew
								}))
								useEdit(false)
							}
						} }
					>Подтвердить</Button>
					<Button
						onClick={ () => {
							useKeywordNew(keyword)
							useEdit(false)
						} }
						className='cancel'
					>Отменить</Button>
					<Button
						onClick={ () => {
							dispatch(deleteKeywordsElement({ index }))
							useKeywordNew(keywordNew)
							useEdit(false)
						} }
						className='delete'
					>Удалить</Button>
				</ToolBar>
			}
		</>
	)
}