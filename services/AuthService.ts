import { AxiosResponse } from 'axios'
import api from '../http'

export default class AuthService {
	static async login({ name, password }): Promise<AxiosResponse<{ token: string }>> {
		return api.post<{ token: string }>('/admin/login', { name, password })
	}

	static async logout(): Promise<AxiosResponse<void>> {
		return api.post('/admin/logout')
	}

	static async check(): Promise<AxiosResponse<void>> {
		return api.get('/admin/check')
	}
}