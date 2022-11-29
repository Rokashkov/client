import TextareaTitle from '../TextareaTitle/TextareaTitle'
import style from './Title.module.css'

export default function Title () {
	return (
		<div className={ style.container }>
			<div className={ style.container__title }>Заглавие</div>
			<TextareaTitle/>
		</div>
	)
}