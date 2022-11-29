import Footer from "./Footer"
import Header from "./Header"
import Main from "./Main"

interface LayoutProps {
	children?: JSX.Element | JSX.Element[]
}

export default function Layout (props: LayoutProps) {
	return (
		<>
			<Header/>
			<Main>{ props.children }</Main>
			<Footer/>
		</>
	)
}