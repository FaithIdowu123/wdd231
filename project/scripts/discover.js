// ✅ Remove top-level imports (they block render)
let displayFeatured, displaymodel, loadjson;

// Cache DOM references early
const increase = document.querySelector("#in");
const decrease = document.querySelector("#de");
const count = document.querySelector("#number");
const genre = document.querySelector("#genre");

let start = 0;
let games = [];

count.textContent = (start / 15) + 1;

window.addEventListener("DOMContentLoaded", () => {
  requestIdleCallback(() => {
    import("./gamequest.mjs").then(m => {
      displayFeatured = m.displayFeatured;
      displaymodel = m.displaymodel;
      loadjson = m.loadjson;
      return loadjson("data/games.json?v=1.0.3");
    })
    .then(data => {
      games = data;
      displayFeatured(games, start, 14 + start);
      displayfilter();
    })
    .catch(err => console.error("Failed to load data:", err));
  });
});

// ✅ Pagination controls
increase.addEventListener("click", () => {
  start += 15;
  if (games.length) {
    if (start > games.length - 14) start = games.length - 14;
    displayFeatured(games, start, 11 + start);
    count.textContent = Math.round((start / 15) + 1);
  }
});

decrease.addEventListener("click", () => {
  start -= 15;
  if (start < 0) start = 0;
  if (games.length) {
    displayFeatured(games, start, 14 + start);
    count.textContent = Math.round((start / 15) + 1);
  }
});

// ✅ Search + filter logic
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const text = document.getElementById("text");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = text.value.toLowerCase();
    const gen = genre.value;

    if (!games.length) return;

    const results = games.filter(game => {
      if (name && gen) {
        return game.title.toLowerCase().includes(name) && game.genre === gen;
      } else if (name) {
        return game.title.toLowerCase().includes(name);
      } else if (gen) {
        return game.genre === gen;
      }
      return true;
    });

    count.textContent = 1;
    if (!gen) {
      displayFeatured(results, 0, 15);
    } else {
      displayFeatured(results, 0, results.length - 1);
    }
  });
});

// ✅ Dynamic genre filter
function displayfilter() {
  genre.innerHTML = "";
  const first = document.createElement("option");
  first.value = "";
  first.textContent = "All";
  genre.appendChild(first);

  if (games.length) {
    const uniqueGenres = [...new Set(games.map(g => g.genre))].sort();
    uniqueGenres.forEach(g => {
      const option = document.createElement("option");
      option.value = g;
      option.textContent = g;
      genre.appendChild(option);
    });
  }
}
