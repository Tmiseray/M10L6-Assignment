

const publicKey = 'e4966ab7a8c8a8d9a26a5fbf1a618afb'
const privateKey = 'd4a43e466a727968a7aaff14ebef65b503db9642'

function generateMD5Hash(ts) {
    return new CryptoJS.MD5(ts + privateKey + publicKey).toString();
}





async function fetchCharacterData(characterName) {
    const ts = Date.now();
    const hash = generateMD5Hash(ts);

    const apiURL = `http://gateway.marvel.com/v1/public/characters?name=${characterName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`

    const response = await fetch(apiURL);
    const results = await response.json();
    const characterData = results.data.results[0];
    return characterData;
}

document.getElementById('marvelForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const character = document.getElementById('character').value;
    try {
        const characterData = await fetchCharacterData(character);
        console.log(characterData);
        let characterName = characterData.name;
        let characterTitle = document.getElementById('characterTitle');
        characterTitle.innerHTML = characterName;
        console.log(characterName);

        let characterThumbnail = `${characterData.thumbnail.path}.${characterData.thumbnail.extension}`.replace('http', 'https');
        let characterImg = document.getElementById('characterImg');
        characterImg.innerHTML = "";

        let image = document.createElement('img');
        image.src = characterThumbnail;
        image.alt = characterName;
        image.classList.add('img-thumbnail');
        characterImg.appendChild(image);

        let URLs = characterData.urls
        URLs.forEach(url => {
            if (url.type === 'detail') {
                let detailLink = document.getElementById('detailLink');
                detailLink.innerHTML = "";

                let detailBtn = document.createElement('button');
                let detailURL = url.url.replace('http', 'https');
                detailBtn.href = detailURL;
                detailBtn.type = 'button';
                detailBtn.classList.add('btn', 'btn-lg', 'btn-outline-danger');
                detailBtn.textContent = `${characterData.name} Details`;
                detailLink.appendChild(detailBtn);
            } else if (url.type === 'wiki') {
                let wikiLink = document.getElementById('wikiLink');
                wikiLink.innerHTML = "";

                let wikiBtn = document.createElement('button');
                let wikiURL = url.url.replace('http', 'https');
                wikiBtn.href = wikiURL;
                wikiBtn.type = 'button';
                wikiBtn.classList.add('btn', 'btn-lg', 'btn-outline-danger');
                wikiBtn.textContent = `${characterData.name} Wiki`;
                wikiLink.appendChild(wikiBtn);
            } else if (url.type === 'comiclink') {
                let comicLink = document.getElementById('comicLink');
                comicLink.innerHTML = "";

                let comicBtn = document.createElement('button');
                let comicURL = url.url.replace('http', 'https');
                comicBtn.href = comicURL;
                comicBtn.type = 'button';
                comicBtn.classList.add('btn', 'btn-lg', 'btn-outline-danger');
                comicBtn.textContent = `${characterData.name} Comic`;
                comicLink.appendChild(comicBtn);
            };
        });

        let andMore = document.createElement('li');
        andMore.textContent = 'And More!';

        let descriptionTitle = document.getElementById('descriptionTitle');
        descriptionTitle.innerHTML = 'Description:';

        let characterDescription = characterData.description;
        let description = document.getElementById('characterDescription');
        description.innerHTML = characterDescription;
        
        let comicsTitle = document.getElementById('comicsTitle');
        comicsTitle.innerHTML = 'Comics:';

        let comicsList = document.getElementById('comicsList');
        comicsList.innerHTML = "";

        let comicsItems = characterData.comics.items;
        comicsItems.forEach(comic => {
            let comicItem = document.createElement('li');
            comicItem.textContent = comic.name;
            comicsList.appendChild(comicItem);
        });

        let seriesTitle = document.getElementById('seriesTitle');
        seriesTitle.innerHTML = 'Series:';

        let seriesList = document.getElementById('seriesList');
        seriesList.innerHTML = "";

        let seriesItems = characterData.series.items;
        seriesItems.forEach(series => {
            let seriesItem = document.createElement('li');
            seriesItem.textContent = series.name;
            seriesList.appendChild(seriesItem);
        });
        
        let storiesTitle = document.getElementById('storiesTitle');
        storiesTitle.innerHTML = 'Stories:';
        
        let storiesList = document.getElementById('storiesList');
        storiesList.innerHTML = "";
        
        let storiesItems = characterData.stories.items;
        storiesItems.forEach(story => {
            let storyItem = document.createElement('li');
            storyItem.textContent = story.name;
            storiesList.appendChild(storyItem);
        });

        comicsList.appendChild(andMore);
        seriesList.appendChild(andMore);
        storiesList.appendChild(andMore);
        
    } catch (error) {
        console.error("Error Fetching character information:", error);
    };
});




async function marvelSubmit(event) {
    event.preventDefault();
    const character = document.getElementById('character').value;
    fetchCharacterData(character);
}


function marvelClick() {
    window.location.href = "https://www.marvel.com/";
}