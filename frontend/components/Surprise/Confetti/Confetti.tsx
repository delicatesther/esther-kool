import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import RConfetti from "react-confetti";

export const Confetti = () => {
	const { width, height } = useWindowSize();
	return <RConfetti width={width} height={height} />;
};
