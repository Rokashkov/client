import Head from '../../components/Head'
import Layout from '../../components/Layout'
import { useCheck } from '../../hooks/useCheck'

export default function Meta () {
	const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL
	useCheck()
	return (
		<>
			<Head
				title='Метатеги'
			/>
			<Layout>
				<a href={ `${ CLIENT_URL }/admin/edit/meta/main` }>/</a>
				<a href={ `${ CLIENT_URL }/admin/edit/meta/all` }>/article/all</a>
			</Layout>
		</>
	)
}