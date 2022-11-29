import { useEffect } from "react"
import AuthService from "../services/AuthService"

export const useCheck = () => {
	useEffect(() => {
		AuthService.check()
			.catch(() => location.href = `${ process.env.NEXT_PUBLIC_CLIENT_URL }/admin/login`)
	}, [])
}