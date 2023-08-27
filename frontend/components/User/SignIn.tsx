import React from "react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { ErrorMessage } from "@enk/components/ErrorMessage";
import { CURRENT_USER_QUERY, SIGNIN_MUTATION, useForm } from "@enk/lib";
import classNames from "classnames/bind";
import style from "./user.module.scss";
import { Button } from "@enk/components/Button";

const cx = classNames.bind(style);

export const SignIn = () => {
	const { inputs, handleChange, resetForm, clearForm } = useForm({
		email: "",
		password: "",
	});

	const [authenticateUserWithPassword, { data, loading }] = useMutation(
		SIGNIN_MUTATION,
		{
			variables: {
				...inputs,
			},
			refetchQueries: [{ query: CURRENT_USER_QUERY }],
		},
	);

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(inputs);
		const res = await authenticateUserWithPassword();
		console.log(res);
		resetForm();
	}

	const error =
		data?.authenticateUserWithPassword?.__typename ===
		"UserAuthenticationWithPasswordFailure"
			? data?.authenticateUserWithPassword
			: undefined;
	return (
		<div className={cx(["signIn"], "row")}>
			<form method="POST" onSubmit={handleSubmit}>
				<h2 className={style.heading}>Sign into your account</h2>
				<ErrorMessage error={error} />
				<fieldset>
					<label htmlFor="signinemailinput">Email</label>
					<input
						id="signinemailinput"
						type="email"
						name="email"
						placeholder="moonstonejamboreen@example.com"
						autoComplete="email"
						value={inputs.email}
						onChange={handleChange}
					/>
					<label htmlFor="signinpasswordinput">Password</label>
					<input
						id="signinpasswordinput"
						type="password"
						name="password"
						autoComplete="password"
						value={inputs.password}
						onChange={handleChange}
					/>
					<Button type="submit" text="Sign in" />
				</fieldset>
			</form>
		</div>
	);
};

export default SignIn;
