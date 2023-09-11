import React from "react";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY, SIGNOUT_MUTATION } from "@enk/lib";
import { Button } from "@enk/components/Button";
import { useRouter } from "next/router";
import translations from "@enk/translations";

export const SignOut = ({ size }) => {
	const router = useRouter();
	const { locale } = router;
	const [endSession, { data, loading, error }] = useMutation(SIGNOUT_MUTATION, {
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	function handleSignOut(e) {
		e.preventDefault();
		endSession();
	}

	return (
		<Button
			type="button"
			onClick={handleSignOut}
			text={`${translations[locale].user.signout}`}
			size={size}
		/>
	);
};

export default SignOut;
