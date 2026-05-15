/** @type {import('next').NextConfig} */
const baseConfig = require("./webpack.common.js");

const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	eslint: {
		ignoreDuringBuilds: true,
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
};

module.exports = nextConfig;
