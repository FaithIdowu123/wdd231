import { apiFetch, loadjson } from "./games.mjs";
import { displayFeatured, displaymodel } from "./display.mjs";
const url = "https://api.allorigins.win/get?url=" + encodeURIComponent(`https://www.freetogame.com/api/games?sort-by=popularity`);

apiFetch(url).then(data => {displayFeatured(data,0, 5);})





