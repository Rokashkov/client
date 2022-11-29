import style from './Pag.module.css' 

interface PagProps {
	page: number
	limit: number
	total: number
	path: string
}

export default function Pag(props: PagProps) {
	const { page, limit, total, path } = props
	let offsetArray = []
	const length = Math.ceil(total / limit)
	for (let i = 1; i <= length; i++) {
		offsetArray.push(i)

	}
	return (
		<div className={ style.pag }>
			{ offsetArray.map(index => {
			const active = index == page
			return (
				<a 
					className={ active ? style.pag__item + ' ' + style.pag__item_active : style.pag__item}
					key={ index }
					href={ `${ process.env.NEXT_PUBLIC_CLIENT_URL }${ path }?page=${ index }&limit=${ limit }` }
				>
					<div className={ style.pag__item__text }>{ index }</div>
				</a>
			)
			}) }
		</div>
	)
}