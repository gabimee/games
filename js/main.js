
const API_KEY = 'afe0770de10b415e935910551de69f08'
const API_URL = 'https://api.rawg.io/api'

async function fetchGames(page = 1, pageSize = 40) {
	try {
		const response = await fetch(
			`${API_URL}/games?page=${page}&page_size=${pageSize}&key=${API_KEY}`
		)
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error fetching games:', error)
		return null
	}
}

async function displayGames() {
	const gamesListElement = document.getElementById('games-list')
	const data = await fetchGames()

	if (data && data.results) {
		data.results.forEach(game => {
			const gameElement = document.createElement('div')
			gameElement.innerHTML = `
						<h2>${game.name}</h2>
						<p>Released: ${game.released}</p>
						<p>Rating: ${game.rating}</p>
						<img src="${game.background_image}" alt="${game.name}" width="200">
					`
			gamesListElement.appendChild(gameElement)
		})
	} else {
		gamesListElement.innerHTML = '<p>No games found.</p>'
	}
}

displayGames()
	
