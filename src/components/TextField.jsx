// Text Field: A field where the user can input text.

import { useId } from "react";

export default function TextField({ label, placeholder, type = "text", value, onChange }) {
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
			/>
		</div>
	);
}