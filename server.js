import express from 'express'
import next from 'next'
import { createServer as createHTTPServer } from 'http'
import { createServer as createHTTPSServer } from 'https'
import path from 'path'
import { readFileSync } from 'fs'
import redirect from './redirect.js'
import dotEnv from 'dotenv'

dotEnv.config()

async function start () {
	const __dirname = path.resolve()
	const app = next({})
	const server = express()

	await app.prepare()

	server.all('*', (req, res) => {
		const handle =  app.getRequestHandler()
		return handle(req, res)
	})

	const __certs = path.resolve('..', '..', 'etc', 'letsencrypt', 'live', 'tomsk-news.ru')

	const privateKey  = readFileSync(path.resolve(__certs, 'privkey.pem'), 'utf8')
	const certificate = readFileSync(path.resolve(__certs, 'fullchain.pem'), 'utf8')

	const HTTPSConfig = {
		key: privateKey,
		cert: certificate
	}

	createHTTPSServer(HTTPSConfig, server).listen(443)
	createHTTPServer(redirect).listen(80)
}

start()