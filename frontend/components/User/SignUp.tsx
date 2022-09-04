import React from "react";
import { useMutation } from "@apollo/client";
import { ErrorMessage } from "@enk/components/ErrorMessage";
import { SIGNUP_MUTATION, useForm } from "@enk/lib";
import style from "./user.module.scss";

export const SignUp = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      ...inputs,
    },
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup().catch(console.error);
    resetForm();
  }

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <h2 className={style.heading}>Sign up for an account</h2>
      {data?.createUser && <p>Signed up with {data?.createUser.email}, go ahead and sign in.</p>}
      <ErrorMessage error={error} />
      <fieldset disabled={loading}>
        <label htmlFor="signupnameinput">Name</label>
        <input
          id="signupnameinput"
          type="text"
          name="name"
          placeholder="Krull the Warrior King"
          value={inputs.name}
          onChange={handleChange}
        />
        <label htmlFor="signupemailinput">Email</label>
        <input
          id="signupemailinput"
          type="email"
          name="email"
          placeholder="moonstonejamboreen@example.com"
          autoComplete="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <label htmlFor="signuppasswordinput">Password</label>
        <input
          id="signinpasswordinput"
          type="password"
          name="password"
          autoComplete="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button type="submit">Sign up</button>
      </fieldset>
    </form>
  );
};

export default SignUp;
