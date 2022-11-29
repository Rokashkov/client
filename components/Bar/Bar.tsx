import style from './Bar.module.css'

interface BarProps {
	children?: JSX.Element | JSX.Element[]
}

export default function Bar (props: BarProps) {
	return (
		<div className={ style.bar }>{ props.children }</div>
	)
}