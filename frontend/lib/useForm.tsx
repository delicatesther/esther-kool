import React, { useEffect, useState } from "react";

export const useForm = (initial = {}): any => {
	const [inputs, setInputs] = useState(initial);
	// Hacky thing to avoid too many useHooks error

	useEffect(() => {
		// this func runs when we are watching change
		setInputs(initial);
		return () => {};
	}, []);

	function handleChange(e) {
		let { name, value, type } = e.target;
		if (type === "number") {
			value = parseInt(value);
		}
		if (type === "file") {
			[value] = e.target.files;
		}
		setInputs({ ...inputs, [name]: value });
	}

	function resetForm() {
		setInputs(initial);
	}

	function clearForm() {
		const blankSlate = Object.fromEntries(
			Object.entries(inputs).map(([key, value]) => [key, ""]),
		);
		setInputs(blankSlate);
	}

	return {
		inputs,
		handleChange,
		resetForm,
		clearForm,
	};
};

export default useForm;
