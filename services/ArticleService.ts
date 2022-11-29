import { AxiosResponse } from 'axios'
import api from '../http'

export default class ArticleService {
	static async all({ page = 1, limit = 10 }): Promise<AxiosResponse<{ articles: ArticleServer[], total: number }>> {
		return api.get<{ articles: ArticleServer[], total: number }>(`/article/all?page=${ page }&limit=${ limit }`)
	}

	static async getById(id: number): Promise<AxiosResponse<ArticleServer>> {
		return api.get<ArticleServer>(`/article/${ id }`)
	}

	static async create(article: ArticleClient): Promise<AxiosResponse<ArticleServer>> {
		return api.post<ArticleServer>('/article/create', article)
	}

	static async update(article: ArticleClient): Promise<AxiosResponse<ArticleServer>> {
		return api.post<ArticleServer>('/article/update', article)
	}

	static async delete(id: number): Promise<AxiosResponse<ArticleServer>> {
		return api.post<ArticleServer>('/article/delete', { id })
	}
}