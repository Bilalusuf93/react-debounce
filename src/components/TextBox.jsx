export default function TextBox({ onChange, value, ...rest }) {
	return (
		<div>
			<input {...rest} onChange={onChange} value={value} type='text' placeholder='Search your character' size='md' />
		</div>
	)
}