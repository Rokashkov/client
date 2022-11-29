import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks'
import { selectTitle, setTitle } from '../../../store/article.slice'
import Button from '../Button/Button'
import Textarea from '../Textarea/Textarea'
import ToolBar from '../ToolBar/ToolBar'
import style from './TextareaTitle.module.css'

export default function TextareaTitle () {
	const dispatch = useAppDispatch()
	let title = useAppSelector(state => selectTitle(state))
	const [isEdit, useEdit] = useState<boolean>(false)
	const [titleNew, useTitleNew] = useState<string>(title)
	useEffect(() => {
		useTitleNew(title)
	}, [title])
	return (
		<>
			<Textarea
				value={ titleNew }
				tag={ 'p' }
				onChange={ (e) => useTitleNew(e.target.value) }
				onClick={ () => useEdit(true) }
			></Textarea>
			{ isEdit &&
				<ToolBar>
					<Button
						className='confirm'
						onClick={ () => {
							dispatch(setTitle({ title: titleNew }))
							useEdit(false)
						} }
					>Подтвердить</Button>
					<Button
						onClick={ () => {
							useTitleNew(title)
							useEdit(false)
						} }
						className='cancel'
					>Отменить</Button>
				</ToolBar>
			}
		</>
	)
}