import Head from '../components/Head'
import Layout from '../components/Layout'
import MetaService from '../services/MetaService'

export default function Index ({ meta }) {
	return (
		<>
			<Head
				title={ meta.title }
				description={ meta.description }
				keywords={ meta.keywords }
			/>
			<Layout><h1>Главная страница</h1></Layout>
		</>
	)
}

export async function getServerSideProps(context) {
	const response = await MetaService.get('main')
	const meta = response.data
	return {
	  	props: { meta }
	}
}