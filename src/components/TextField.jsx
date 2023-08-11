// Text Field: A field where the user can input text.

import { useId } from "react";

export default function TextField(props) {
	// Destructure props:
	const { type = "text", label, value, placeholder, onChange, required } = props;

	// Create a unique ID for the input field:
	const inputId = useId();

	// Update onChange callback with value:
	function handleChange(event) {
		onChange(event.target.value);
	};

	return (
		<div className="text-field">
			<label
				className="text-field-label"
				htmlFor={inputId}>
				{label}
			</label>
			<input
				className="text-field-input"
				id={inputId}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				required={required}
				maxLength={50}
			/>
		</div>
	);
}