import { MouseEventHandler } from 'react'
import style from './Button.module.css'

interface ButtonProps {
	children: string
	className: string
	onClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button (props: ButtonProps) {
	const { children, className, onClick } = props
	return (
		<button 
			className={ style.button + ' ' + style[className] }
			onClick={ onClick }
		>{ children }</button>
	)
}