import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks"
import { increment, decrement, incrementByAmount, incrementAsync, selectCount } from "../../redux/counter.slice"
import styles from './Counter.module.css'

export default function Counter () {
	const counter = useAppSelector((state) => selectCount(state))
	const dispatch = useAppDispatch()
	const [amount, useAmount] = useState(counter)
	return (
		<div className={ styles['flex-container'] }>
			<div className={ styles.counter }>{ counter }</div>
			<div className={ styles['flex-container'] }>
				<button 
					className={ styles.button }
					onClick={ () => dispatch(increment()) }
				>
					+
				</button>
				<button
					className={ styles.button }
					onClick={ () => dispatch(decrement()) }
				>
					-
				</button>
			</div>
			<div className={ styles['flex-container'] }>
				<input
					className={ styles.input }
					type="text"
					onChange={ (e) => { useAmount(Number(e.currentTarget.value) || 0) } }
				/>
				<button
					className={ styles.button }
					onClick={ () => dispatch(incrementByAmount(amount)) }
				>
					Add Amount
				</button>
				<button
					className={ styles.button }
					onClick={ () => dispatch(incrementAsync(amount)) }
				>
					Add Async
				</button>
			</div>
		</div>
	)
}