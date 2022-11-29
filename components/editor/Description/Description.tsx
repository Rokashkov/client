import TextareaDescription from '../TextareaDescription/TextareaDescription'
import style from './Description.module.css'

export default function Description () {
	return (
		<div className={ style.container }>
			<div className={ style.container__title }>Описание</div>
			<TextareaDescription/>
		</div>
	)
}