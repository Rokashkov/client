import axios, { AxiosRequestConfig } from 'axios'
import config from '../config.json'

const api = axios.create({
	withCredentials: true,
	baseURL: config.API_URL
})

api.interceptors.request.use((config: AxiosRequestConfig) => {
	config.headers.Authorization = `Bearer ${ typeof window !== 'undefined' ? localStorage.getItem('token') : '' }`
	return config
})

export default api