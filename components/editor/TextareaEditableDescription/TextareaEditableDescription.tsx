import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks'
import Button from '../Button/Button'
import Textarea from '../Textarea/Textarea'
import ToolBar from '../ToolBar/ToolBar'
import style from './TextareaEditable.module.css'

interface TextareaEditableDescriptionProps {
	actionCreator (payload?: any): {
		payload: any
		type: string
	}
	selector (state: {
		article: ArticleServer;
		meta: MetaServer;
	}): any
	children: string
}

export default function TextareaEditableDescription (props: TextareaEditableDescriptionProps) {
	const { actionCreator, selector } = props
	const dispatch = useAppDispatch()
	let state = useAppSelector(state => selector(state))
	const [isEdit, useEdit] = useState<boolean>(false)
	const [stateNew, useStateNew] = useState<string>(state)
	useEffect(() => {
		useStateNew(state)
	}, [state])
	return (
		<>
			<div className={ style.container }>
			<div className={ style.container__title }>{ props.children }</div>
				<Textarea
					value={ stateNew }
					tag={ 'p' }
					onChange={ (e) => useStateNew(e.target.value) }
					onClick={ () => useEdit(true) }
				></Textarea>
				{ isEdit &&
					<ToolBar>
						<Button
							className='confirm'
							onClick={ () => {
								dispatch(actionCreator({ description: stateNew }))
								useEdit(false)
							} }
						>Подтвердить</Button>
						<Button
							onClick={ () => {
								useStateNew(state)
								useEdit(false)
							} }
							className='cancel'
						>Отменить</Button>
					</ToolBar>
				}
			</div>
			
		</>
	)
}