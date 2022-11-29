import style from './ToolBar.module.css'

interface ToolBarProps {
	children: JSX.Element | JSX.Element[]
}

export default function ToolBar (props: ToolBarProps) {
	const { children } = props
	return (
		<div className={ style.container }>
			{ children }
		</div>
	)
}