import express from 'express'
import next from 'next'
import { createServer as createHTTPServer } from 'http'
import { createServer as createHTTPSServer } from 'https'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import redirect from './redirect.js'
import dotEnv from 'dotenv'

dotEnv.config()

async function start () {
	const app = next({})
	const server = express()

	await app.prepare()

	server.all('*', (req, res) => {
		const handle =  app.getRequestHandler()
		return handle(req, res)
	})

	const __certs = resolve(__dirname, '..', '..', 'etc', 'letsencrypt', 'live', process.env.DOMAIN)

	const privateKey  = readFileSync(resolve(__certs, 'privkey.pem'), 'utf8')
	const certificate = readFileSync(resolve(__certs, 'fullchain.pem'), 'utf8')

	const HTTPSConfig = {
		key: privateKey,
		cert: certificate
	}

	createHTTPSServer(HTTPSConfig, server).listen(443)
	createHTTPServer(redirect).listen(80)
}

start()