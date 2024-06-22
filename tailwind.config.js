/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./*.{html,js}', '**/*.{js}'],
	theme: {
		extend: {
			fontFamily: {
				serif: ['Nunito Sans', 'sans-serif'],
			},
			colors: {
				white: '#fff',
				body: '#f2f2f2',
				black: '111517',
				gray: '#848484',
				'dark-blue': '#2B3844',
				'body-dark': '#202C36',
			},
		},
	},
	plugins: [],
}
