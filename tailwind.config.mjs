/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
		"./src/styles/*.css"
	],
	theme: {
		extend: {
			colors: {
				WIblack: {
					DEFAULT: "#231F20"
				},
				WIwhite: {
					DEFAULT: "#FFFFFF"
				},
				WIivory: {
					DEFAULT: "#E7E4D8",
					contrast: "#D0C8C1"
				},
				WIblue: {
					DEFAULT: "#003954",
					input: "#0C31F1"
				},
				WIgray: {
					DEFAULT: "#C1BBBB",
					contrast: "#858585",
					light: "#D9D9D9"
				}
			},
			borderWidth: {
				1: "1px"
			},
			screens: {
				xs: "350px"
			}
		},
	},
	plugins: []
}
