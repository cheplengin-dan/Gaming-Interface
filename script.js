const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const gameList = document.getElementById('game-list');
const gameInfo = document.getElementById('game-info');

const authenticate = async () => {
const clientId = 'e90gluw7ktm1bbvmqq6pfxo5fad654';
const clientSecret = '2bknufye5g4x8imoxejougovdwv5at';

const response = await fetch('https://id.twitch.tv/oauth2/token', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
client_id: clientId,
client_secret: clientSecret,
grant_type: 'client_credentials',
}),
});

const data = await response.json();
return data.access_token;
};

const displayGameList = (games) => {
gameList.innerHTML = '';
games.forEach(game => {
const gameElement = document.createElement('div');
const gameName = document.createElement('h2');
const gameCover = document.createElement('img');
gameName.textContent = game.name;
if (game.cover) {
gameCover.src = `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`;
} else {
gameCover.src = 'https://via.placeholder.com/200x300?text=No+Cover';
}
gameElement.appendChild(gameName);
gameElement.appendChild(gameCover);
gameList.appendChild(gameElement);
});
};

(async () => {
const accessToken = await authenticate();

fetch('https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games', {
headers: {
'Client-ID': 'e90gluw7ktm1bbvmqq6pfxo5fad654',
'Authorization': `Bearer ${accessToken}`,
'Content-Type': 'application/json',
},
method: 'POST',
body: JSON.stringify([{ search: searchInput.value, fields: ['name', 'limit 10', 'cover.image_id'] }]),
})
.then(response => response.json())
.then(data => displayGameList(data))
.catch(error => console.error(error));
})();


