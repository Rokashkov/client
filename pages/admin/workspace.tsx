import Content from '../../components/Content/Content'
import Head from '../../components/Head'
import Layout from '../../components/Layout'
import { useCheck } from '../../hooks/useCheck'

export default function Workspace () {
	const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL
	useCheck()
	return (
		<>
			<Head
				title='Раздел администратора'
			/>
			<Layout>
				<Content>
					<a href={ `${ CLIENT_URL }/admin/meta` }>Редактор метатегов главных страниц</a>
					<a href={ `${ CLIENT_URL }/admin/create` }>Создать статью</a>
					<a href={ `${ CLIENT_URL }/admin/edit` }>Редактировать/удалить статью</a>
				</Content>
			</Layout>
		</>
	)
}