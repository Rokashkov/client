import Views from '../svg/Views'
import style from './Meta.module.css'
import moment from 'moment'
import 'moment/locale/ru'

interface MetaProps {
	views: number
	createdAt: Date
}

export default function Meta (props: MetaProps) {
	const { views, createdAt } = props
	return (
		<div className={ style.meta }>
			<div className={ style.meta__views }>
				<Views
					className={ style.meta__views__svg }
					size={ 14 }
				/>
				<div className={ style.meta__views__counter }>{ views }</div>
			</div>
			<div className={ style.meta__timestamp }>{ moment(createdAt).fromNow() }</div>
		</div>
	)
}