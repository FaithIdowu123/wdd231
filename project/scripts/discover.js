import { apiFetch } from "./games.mjs";
import { displayFeatured, displaymodel } from "./display.mjs";
const url = `https://corsproxy.io/?https://www.freetogame.com/api/games`;
const increase = document.querySelector("#in");
const decrease = document.querySelector("#de");
const count = document.querySelector("#number");
const genre = document.querySelector("#genre");

let start = 0
count.textContent = (start / 12) + 1

displayfilter()

apiFetch(url).then(data => {
  displayFeatured(data,start, 11 + start);
  var total = 0
  data.forEach(game => {
    total += 1
  });
  console.log(total);
})

increase.addEventListener("click", ()=>{
    start += 12
    apiFetch(url).then(data => { 
        if (start > data.length - 11 ){
          start = data.length - 11 
        }
        displayFeatured(data,start, 11 + start);
        count.innerHTML = Math.round((start / 12) + 1)
    })
});

decrease.addEventListener("click", ()=>{
    start -= 12
    if (start < 0 ){
        start = 0
    }
    apiFetch(url).then(data => { 
      displayFeatured(data,start, 11 + start)
      count.innerHTML = Math.round((start / 12) + 1);
    }) 
    
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const text = document.getElementById("text");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = text.value.toLowerCase();
    const gen = genre.value;

    apiFetch(url).then(data => {
      const results = data.filter(game => {
        if (name && gen) {
          return game.title.toLowerCase().includes(name) && game.genre === gen;
        } else if (name) {
          return game.title.toLowerCase().includes(name);
        } else if (gen) {
          return game.genre === gen;
        } else {
          return game
        }
    });
      count.textContent = 1
      if (!gen){
        displayFeatured(results,0, 11);
      } else {
        displayFeatured(results, 0, results.length - 1);
      }
    });
  });
});

function displayfilter(){
    genre.innerHTML= ``;
    let first = document.createElement("option");
    first.value = "";
    first.textContent = "All";
    genre.appendChild(first)
    apiFetch(url).then(data => {
        let genres = data.map(game => game.genre);
        let uniqueGenres = [...new Set(genres)];
        uniqueGenres.sort();
        uniqueGenres.forEach(g => {
            let option = document.createElement("option");
            option.value = g;
            option.textContent = g;
            genre.appendChild(option);
        });
    })
}