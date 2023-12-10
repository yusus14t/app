import  {NumericFormat}  from 'react-number-format'

export const CustomInput = ({ field, onChange, errors, ...rest }) => {
	// const getError = () => _.get(errors, field?.name);

	function handleChange(event) {
		if (onChange) onChange(event);
		field?.onChange(event);
	}

	return (
		<>
			<input
				type="text"
				className="champ-form__cm-input mb-1"
				{...field}
				{...rest}
				onChange={handleChange}
			/>

			{/* {getError() && (
				<span className="text-danger"> {getError()?.message}</span>
			)} */}
		</>
	);
}

export const CustomInputMask = ({ field, errors, onChange, format, ...rest }) => {
	// const getError = () => _.get(errors, field?.name);

	function handleChange(event) {
		event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
		if (onChange) onChange(event);
		field?.onChange(event);
	}

	return (
		<>
			<NumericFormat
				format={format || "(###) ###-####"}
				className="champ-form__cm-input"
				{...field}
				{...rest}
				onChange={handleChange}
			/>
			{/* {getError() && (
				<span className="text-danger"> {getError()?.message}</span>
			)} */}
		</>
	);
};