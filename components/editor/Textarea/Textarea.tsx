import style from './Textarea.module.css'
import TextareaAutosize from 'react-textarea-autosize'
import { ChangeEventHandler, MouseEventHandler } from 'react'

interface TextareaProps {
	value?: string
	tag?: tag
	autoFocus?: boolean
	onChange?: ChangeEventHandler<HTMLTextAreaElement>
	onClick?: MouseEventHandler<HTMLTextAreaElement>
}

export default function Textarea (props: TextareaProps) {
	const { value, tag, autoFocus, onChange, onClick } = props
	return(
		<TextareaAutosize
			value={ value }
			autoFocus={ autoFocus }
			className={ tag ? style.textarea + ' ' + style[tag] : style.textarea}
			onChange={ onChange }
			onClick={ onClick }
		/>
	)
}