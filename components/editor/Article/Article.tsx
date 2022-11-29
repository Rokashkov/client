import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks'
import style from './Article.module.css'
import { selectContent, pushContentElement } from '../../../store/article.slice'
import Button from '../Button/Button'
import { useEffect, useState } from 'react'
import ToolBar from '../ToolBar/ToolBar'
import Select from '../Select/Select'
import Textarea from '../Textarea/Textarea'
import TextareaContent from '../TextareaContent/TextareaContent'

export default function Article () {
	const dispatch = useAppDispatch()
	let content = useAppSelector((state) => selectContent(state))
	const [isEdit, useEdit] = useState<boolean>(false)
	const [tag, useTag] = useState<tag>('p')
	const [text, useText] = useState<string>('')
	const [contentNew, useContentNew] = useState<content>(content)
	useEffect(() => {
		useContentNew(content)
	}, [content])
	return (
		<article>
			<p className={ style.title }>Статья</p>
			<div className={ style.content }>
				{ contentNew.map(element => {
					const index = contentNew.indexOf(element)
					return (
						<TextareaContent
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
						onChange={ (e) => useText(e.target.value) }
						tag={ tag }
					></Textarea>
					<ToolBar>
						<Select
							onChange={ (e) => useTag(e.target.value as tag) }
						/>
						<Button 
							className='create'
							onClick={ () => {
								dispatch(pushContentElement({ element: { tag, text } }))
								useText('')
								useTag('p')
								useEdit(false)
							} }
						>Создать</Button>
						<Button 
							className='cancel'
							onClick={ () => useEdit(false)}
						>Отмена</Button>
					</ToolBar>
				</> }
			</div>
		</article>
	)
}