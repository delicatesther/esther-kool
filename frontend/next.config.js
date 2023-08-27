/** @type {import('next').NextConfig} */
const baseConfig = require("./webpack.common.js");

const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	publicRuntimeConfig: {
		GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
	},
	webpack(config, options) {
		baseConfig,
			config.module.rules.push({
				test: /\.svg$/,
				use: [
					{
						loader: "@svgr/webpack",
						options: {
							svgo: false,
							titleProp: true,
						},
					},
				],
			});
		// Important: return the modified config
		return config;
	},
	// Temp workaround that maybe fixes session issue Keystone,
	// See: https://stackoverflow.com/questions/72297519/keystone-session-cookie-only-working-on-localhost
	rewrites: () => [
		{
			source: "/api/graphql",
			destination:
				process.env.NODE_ENV === "development"
					? `http://localhost:3010/api/graphql`
					: process.env.GRAPHQL_ENDPOINT,
		},
	],
};

module.exports = nextConfig;
