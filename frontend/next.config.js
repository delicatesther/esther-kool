/** @type {import('next').NextConfig} */
const baseConfig = require("./webpack.common.js");

const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	publicRuntimeConfig: {
		GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
		ALEX_POST: process.env.ALEX_POST,
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
	i18n: {
		locales: ["en", "nl"],
		defaultLocale: "nl",
	},
	images: {
		domains: ["res.cloudinary.com"],
	},
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
