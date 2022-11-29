interface MainProps {
	children?: JSX.Element | JSX.Element[]
}

export default function Main (props: MainProps) {
	return (
		<main>{ props.children }</main>
	)
}