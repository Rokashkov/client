import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks'
import { selectDescription, setDescription } from '../../../store/article.slice'
import Button from '../Button/Button'
import Textarea from '../Textarea/Textarea'
import ToolBar from '../ToolBar/ToolBar'

export default function TextareaDescription () {
	const dispatch = useAppDispatch()
	const description = useAppSelector(state => selectDescription(state))
	const [isEdit, useEdit] = useState<boolean>(false)
	const [descriptionNew, useDescriptionNew] = useState<string>(description)
	useEffect(() => {
		useDescriptionNew(description)
	}, [description])
	return (
		<>
			<Textarea
				value={ descriptionNew }
				tag={ 'p' }
				onChange={ (e) => useDescriptionNew(e.target.value) }
				onClick={ () => useEdit(true) }
			></Textarea>
			{ isEdit &&
				<ToolBar>
					<Button
						className='confirm'
						onClick={ () => {
							dispatch(setDescription({ description: descriptionNew }))
							useEdit(false)
						} }
					>Подтвердить</Button>
					<Button
						onClick={ () => {
							useDescriptionNew(description)
							useEdit(false)
						} }
						className='cancel'
					>Отменить</Button>
				</ToolBar>
			}
		</>
	)
}