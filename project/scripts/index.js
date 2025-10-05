import { displayFeatured, displaymodel, apiFetch } from "./gamequest.mjs";
const url = `https://corsproxy.io/?https://www.freetogame.com/api/games?sort-by=popularity`;

apiFetch(url).then(data => {displayFeatured(data,0, 5);})





