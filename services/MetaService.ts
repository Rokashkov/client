import { AxiosResponse } from 'axios'
import api from '../http'

export default class MetaService {
	static async get(name: string): Promise<AxiosResponse<MetaServer>> {
		return api.post<MetaServer>('/meta/get', { name })
	}

	static async update(meta: MetaClient): Promise<AxiosResponse<MetaServer>> {
		return api.post<MetaServer>('/meta/update', meta)
	}
}