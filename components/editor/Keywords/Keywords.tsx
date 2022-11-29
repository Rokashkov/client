import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks'
import style from './Keywords.module.css'
import { selectKeywords, pushKeywordsElement, setKeywords } from '../../../store/article.slice'
import Button from '../Button/Button'
import { useEffect, useState } from 'react'
import ToolBar from '../ToolBar/ToolBar'
import Textarea from '../Textarea/Textarea'
import TextareaKeywords from '../TextareaKeyword/TextareaKeywords'

export default function Keywords () {

	const dispatch = useAppDispatch()
	let keywords = useAppSelector((state) => selectKeywords(state))
	const [isEdit, useEdit] = useState<boolean>(false)
	const [keywordsNew, useKeywordsNew] = useState<string[]>(keywords)
	const [keyword, useKeyword] = useState<string>('')
	useEffect(() => {
		useKeywordsNew(keywords)
	}, [keywords])
	return (
		<div className={ style.container }>
			<p className={ style.container__title }>Ключевые слова</p>
			<div className={ style.container__content }>
				{ keywordsNew.map(keyword => {
					const index = keywordsNew.indexOf(keyword)
					return (
						<TextareaKeywords
							key={ index }
							index={ index }
						/>
					)
				}) }
				{ !isEdit && 
					<Button 
						className='new'
						onClick={ () => useEdit(true)}
					>Новый элемент</Button>
				}
				{ isEdit && <>
					<Textarea 
						autoFocus={ true }
						onChange={ (e) => useKeyword(e.target.value) }
						tag={ 'p' }
					></Textarea>
					<ToolBar>
						<Button 
							className='create'
							onClick={ () => {
								if (keywords.indexOf(keyword) === -1) {
									dispatch(pushKeywordsElement({ keyword }))
									useKeyword('')
									useEdit(false)
								}
							} }
						>Создать</Button>
						<Button 
							className='cancel'
							onClick={ () => useEdit(false)}
						>Отмена</Button>
					</ToolBar>
				</> }
			</div>
		</div>
	)
}