import { useEffect, useState } from 'react'
import Content from '../../components/Content/Content'
import Head from '../../components/Head'
import Layout from '../../components/Layout'
import AuthService from '../../services/AuthService'

export default function Login () {
	const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL
	const [name, useName] = useState(undefined)
	const [password, usePassword] = useState(undefined)
	const [isFetching, useFetching] = useState(false)
	const [err, useErr] = useState(undefined)
	useEffect(() => {
		AuthService.check()
			.then(() => {
				location.href = `${ CLIENT_URL }/admin/workspace`
			})
			.catch(() => useErr(undefined))
	}, [])
	useEffect(() => {
		if (isFetching == true) {
			AuthService.login({ name, password })
				.then(response => {
					localStorage.setItem('token', response.data.token)
					location.href = `${ CLIENT_URL }/admin/workspace`
				})
				.catch(err => useErr(err.response))
				.finally(() => useFetching(false))
		}
	}, [isFetching])
	return (
		<>
			<Head
				title='Вход'
			/>
			<Layout>
				<Content>
					<div className="input-group">
						<div>Логин</div>
						<input
							type="text"
							onChange={ (e) => {
								useName(e.target.value)
								useErr(undefined)
							} }
						/>
						<div>Пароль</div>
						<input
							type="password"
							onChange={ (e) => {
								usePassword(e.target.value) 
								useErr(undefined)
							} }
						/>
					</div>
					<button
						onClick={ () => {
							if (!isFetching) {
								useErr(undefined)
								useFetching(true)
							}
						}}
					>Войти</button>
					{ err && err.status == 400 && <div>Неверный логин или пароль</div> }
					{ err && err.status > 400 && <div>Произошла ошибка :{ '(' }</div> }
				</Content>
			</Layout>
		</>
	)
}