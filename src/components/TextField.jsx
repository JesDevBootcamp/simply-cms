// Text Field: A field where the user can input text.

import { useId } from "react";

import "../styles/text-field.scss";

export default function TextField(props) {
	// Destructure props:
	const {
		type = "text",
		placeholder = "",
		maxLength = 50,
		label = "Enter Information:",
		value, onChange, required
	} = props;

	// Create a unique ID for the input field:
	const inputId = useId();

	// Update onChange callback with value:
	function handleChange(event) {
		onChange(event.target.value.trim());
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
				placeholder={placeholder.trim()}
				value={value.trim()}
				onChange={handleChange}
				required={required}
				maxLength={maxLength}
			/>
		</div>
	);
}