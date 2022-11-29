import { ChangeEventHandler } from 'react'
import style from './Select.module.css'

interface SelectProps {
	value?: tag
	onChange?: ChangeEventHandler<HTMLSelectElement>
}

export default function Select (props: SelectProps) {
	const { value, onChange } = props
	return (
		<select
			className={ style.select }
			defaultValue={ value || 'p' }
			onChange={ onChange }
		>
			<option value="p">p</option>
			<option value="h1">h1</option>
			<option value="h2">h2</option>
			<option value="h3">h3</option>
			<option value="h4">h4</option>
			<option value="h5">h5</option>
			<option value="h6">h6</option>
		</select>
	)
}