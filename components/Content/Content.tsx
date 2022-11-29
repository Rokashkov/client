import style from './Content.module.css'

interface ContentProps {
	children?: JSX.Element | JSX.Element[]
}

export default function Content (props: ContentProps) {
	return (
		<div className={ style.content }>{ props.children }</div>
	)
}