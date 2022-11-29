import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks'
import { deleteContentElement, setContentElement, selectContent } from '../../../store/article.slice'
import Button from '../Button/Button'
import Select from '../Select/Select'
import Textarea from '../Textarea/Textarea'
import ToolBar from '../ToolBar/ToolBar'
import style from './TextareaContent.module.css'

interface TextareaContentProps {
	index?: number
}

export default function TextareaContent (props: TextareaContentProps) {
	const { index } = props
	const dispatch = useAppDispatch()
	const content = useAppSelector(state => selectContent(state))
	let text: string, tag: tag
	if (content[index]) {
		text = content[index].text
		tag = content[index].tag
	}
	const [isEdit, useEdit] = useState<boolean>(false)
	const [textNew, useTextNew] = useState<string>(text)
	const [tagNew, useTagNew] = useState<tag>(tag)
	useEffect(() => {
		useTextNew(text)
		useTagNew(tag)
	}, [content[index]])
	return (
		<>
			<Textarea
				value={ textNew }
				tag={ tagNew }
				onChange={ (e) => useTextNew(e.target.value) }
				onClick={ () => useEdit(true) }
			></Textarea>
			{ isEdit &&
				<ToolBar>
					<Select
						value={ tagNew }
						onChange={ (e) => useTagNew(e.target.value as tag) }
					/>
					<Button
						className='confirm'
						onClick={ () => {
							dispatch(setContentElement({
								index,
								element: { tag: tagNew, text: textNew }
							}))
							useEdit(false)
						} }
					>Подтвердить</Button>
					<Button
						onClick={ () => {
							useTagNew(tag)
							useTextNew(text)
							useEdit(false)
						} }
						className='cancel'
					>Отменить</Button>
					<Button
						onClick={ () => {
							dispatch(deleteContentElement({ index }))
							useEdit(false)
						} }
						className='delete'
					>Удалить</Button>
				</ToolBar>
			}
		</>
	)
}