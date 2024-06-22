const API_KEY = 'afe0770de10b415e935910551de69f08'
const API_URL = 'https://api.rawg.io/api'

let elGameList = document.querySelector('.games-list')
let elSearchInput = document.querySelector('.search-input')

let gamesData = [] // To store the fetched games data

// Function to fetch games from API
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

// Function to display games based on current data
async function displayGames() {
	const gamesListElement = document.getElementById('games-list')
	const data = await fetchGames()

	gamesListElement.innerHTML = '' // Clear previous content

	if (data && data.results) {
		data.results.forEach(game => {
			const gameElement = createGameElement(game)
			gamesListElement.appendChild(gameElement)
		})
	} else {
		gamesListElement.innerHTML = '<p>No games found.</p>'
	}
}

// Function to create game HTML element
function createGameElement(game) {
	const gameElement = document.createElement('div')
	gameElement.innerHTML = `
        <img class="rounded-lg" src="${game.background_image}" alt="${game.name}" width="300">
        <h2>${game.name}</h2>
        <p>Released: ${game.released}</p>
        <p>Rating: ${game.rating}</p>
    `
	return gameElement
}

// Function to handle search input changes
function handleSearchInput() {
	let inputValue = elSearchInput.value.trim().toLowerCase()

	if (inputValue) {
		const filteredGames = gamesData.filter(game =>
			game.name.toLowerCase().includes(inputValue)
		)
		displayFilteredGames(filteredGames)
	} else {
		displayGames() // If input is empty, display all games
	}
}

// Function to display filtered games
function displayFilteredGames(filteredGames) {
	const gamesListElement = document.getElementById('games-list')
	gamesListElement.innerHTML = '' // Clear previous content

	if (filteredGames.length > 0) {
		filteredGames.forEach(game => {
			const gameElement = createGameElement(game)
			gamesListElement.appendChild(gameElement)
		})
	} else {
		gamesListElement.innerHTML = '<p>No games found.</p>'
	}
}

// Event listener for search input changes
elSearchInput.addEventListener('input', handleSearchInput)

// Function to initialize the app
async function initialize() {
	const data = await fetchGames()
	if (data && data.results) {
		gamesData = data.results // Store fetched games data
		displayGames() // Display initial set of games
	} else {
		elGameList.innerHTML = '<p>No games found.</p>'
	}
}

// Initialize the app
initialize()
