import { apiFetch, loadjson } from "./games.mjs";
import { displayFeatured, displaymodel } from "./display.mjs";
import { getRandomInt} from "./random.mjs";
const url = `https://corsproxy.io/?https://www.freetogame.com/api/games?sort-by=popularity`;


apiFetch(url).then(data => {
    let random = getRandomInt(0, data.length - 1);
    displayFeatured(data,random, random + 2);
})

document.addEventListener("DOMContentLoaded", function() {
    var timestampField = document.getElementById("formLoadTime");
    var currentTimestamp = new Date().toISOString();
    timestampField.value = currentTimestamp;
});
