/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

const API_KEY = 'afe0770de10b415e935910551de69f08'
const API_URL = 'https://api.rawg.io/api'

fetch(`${API_URL}/games?key=${API_KEY}`)
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(err => console.error(err.massage))


