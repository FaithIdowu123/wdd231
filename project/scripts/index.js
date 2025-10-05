import { apiFetch } from "./games.mjs";
import { displayFeatured, displaymodel } from "./display.mjs";
const url = `https://corsproxy.io/?https://www.freetogame.com/api/games?sort-by=popularity`;

apiFetch(url).then(data => {displayFeatured(data,0, 5);})





