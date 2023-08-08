// Text Field: A field where the user can input text.

import { useId } from "react";

export default function TextField({ label, type = "text", placeholder = "" }) {
	// Create a unique ID for the input field:
	const inputId = useId();

	return (
		<div className="TextField">
			<label
				className="TextField-label"
				htmlFor={inputId}>
				{label}
			</label>
			<input
				className="TextField-input"
				id={inputId}
				type={type}
				placeholder={placeholder}
			/>
		</div>
	);
}