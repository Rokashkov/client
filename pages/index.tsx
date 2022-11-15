import { skipToken } from '@reduxjs/toolkit/dist/query'
import Head from 'next/head'
import { useState } from 'react'
import Counter from '../components/Counter/Counter'
import { useGetArticleQuery } from '../redux/api'

export default function Index () {
	const [value, useValue] = useState(null)
	const [id, useId] = useState(0)
	const result = useGetArticleQuery(id ? { id } : skipToken)
	const { error, data, isLoading, isError } = result
	return (
		<>
			<Head>
				<title>Index</title>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
				<link rel="manifest" href="/site.webmanifest"/>
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000"/>
				<meta name="msapplication-TileColor" content="#ffffff"/>
				<meta name="theme-color" content="#ffffff"/>
			</Head>
			<Counter/>
			<input 
				type="text"
				onChange={ (e) => useValue(Number(e.currentTarget.value) || 0)}
			/>
			<button
				onClick={ () => {
					value ? useId(value) : console.log('Invalid value')
				} }
			>
				Fetch Article
			</button>
			<div>
				{ isLoading && 'Loading...' }
				{ !isLoading && !isError && data && data.id }
				{ isError && 'status' in error && error.status }
			</div>
			
		</>
	)
}