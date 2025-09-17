import { loadmembers } from "./members.mjs";
import { apiFetch } from "./weather.mjs";

const key = "b11aab77e925ca370700d0c87f7e4b22";
const lat = 7.161000;
const lon = 3.348000;

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
const urlfourday = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;

// get current weather
apiFetch(url).then(data => {
  const current = document.querySelector(".current");
  current.innerHTML = "";

  if (data && data !== "null") {
    const title = document.createElement("h3");
    title.textContent = "Current Weather";

    const name = document.createElement("h4");
    name.textContent = data.name;

    const desc = document.createElement("p");
    desc.textContent = data.weather[0].description;

    const icon = document.createElement("img");
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    icon.setAttribute("alt", data.weather[0].description);
    icon.setAttribute("fetchpriority", "high");

    const temp = document.createElement("p");
    temp.textContent = data.main.temp + " °F";

    current.appendChild(title);
    current.appendChild(name);
    current.appendChild(desc);
    current.appendChild(icon);
    current.appendChild(temp);
  } else {
    const error = document.createElement("h3");
    error.textContent = "Oops something went wrong!";
    current.appendChild(error);
  }
});

// get 4-day forecast
apiFetch(urlfourday).then(data => {
  const forecast = formatDailySummary(data.list);
  displaycards(forecast);
});

// load members
loadmembers().then(data => {
  displaydata(data);
});

function displaydata(members) {
  const container = document.querySelector("#cards");
  container.innerHTML = "";

  let used = [];

  for (let i = 0; i < 3;) {
    let random = getRandomInt(0, 6);

    // skip if already used
    if (used.includes(random)) {
      continue;
    }

    const member = members[random];
    if (member.membershipLevel >= 2) {
      used.push(random);
      i++;

      const card = document.createElement("section");

      const name = document.createElement("p");
      name.textContent = member.name;

      const img = document.createElement("img");
      img.setAttribute("src", "images/" + member.image);
      img.setAttribute("alt", member.name);
      img.setAttribute("fetchpriority", "high");

      const address = document.createElement("p");
      address.textContent = member.address;

      const phone = document.createElement("p");
      phone.textContent = member.phone;

      const link = document.createElement("a");
      link.setAttribute("href", member.website);
      link.textContent = "Link to page";

      const level = document.createElement("p");
      level.innerHTML = "<strong>Membership Level:</strong> " + member.membershipLevel;

      if (member.membershipLevel == 2) {
        card.classList.add("Silver");
      } else {
        card.classList.add("Gold");
      }

      card.appendChild(name);
      card.appendChild(img);
      card.appendChild(address);
      card.appendChild(phone);
      card.appendChild(link);
      card.appendChild(level);

      container.appendChild(card);
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatDailySummary(list) {
  const grouped = {};
  const today = new Date().toISOString().split("T")[0];

  list.forEach(item => {
    const date = new Date(item.dt * 1000).toISOString().split("T")[0];

    if (!grouped[date]) {
      grouped[date] = { temps: [], weather: [] };
    }

    grouped[date].temps.push(item.main.temp);
    grouped[date].weather.push({
      description: item.weather[0].description,
      icon: item.weather[0].icon
    });
  });

  if (!grouped[today]) {
    grouped[today] = { temps: [], weather: [] };
  }

  const summaries = [];

  for (let date in grouped) {
    const data = grouped[date];

    if (data.temps.length === 0) {
      summaries.push({
        date: date,
        minTemp: null,
        maxTemp: null,
        weather: "N/A",
        icon: ""
      });
    } else {
      // count most common weather type
      const counts = {};
      data.weather.forEach(w => {
        const key = w.description + "|" + w.icon;
        if (!counts[key]) {
          counts[key] = 0;
        }
        counts[key]++;
      });

      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      const [description, icon] = sorted[0][0].split("|");

      summaries.push({
        date: date,
        minTemp: Math.min(...data.temps),
        maxTemp: Math.max(...data.temps),
        weather: description,
        icon: "https://openweathermap.org/img/wn/" + icon + ".png"
      });
    }
  }

  return summaries;
}

function displaycards(weathers) {
  const container = document.querySelector("#day");
  container.innerHTML = "";

  for (let i = 1; i < 4; i++) {
    const weather = weathers[i];

    const card = document.createElement("aside");

    const title = document.createElement("h5");
    if (i == 1) {
      title.textContent = "Tomorrow";
    } else {
      title.textContent = weather.date;
    }

    const desc = document.createElement("p");
    desc.textContent = weather.weather;

    const img = document.createElement("img");
    img.setAttribute("src", weather.icon);
    img.setAttribute("alt", weather.weather);
    img.setAttribute("fetchpriority", "high");

    const temp = document.createElement("p");
    temp.textContent = ((weather.minTemp + weather.maxTemp) / 2).toFixed(2) + " °F";

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(img);
    card.appendChild(temp);

    container.appendChild(card);
  }

  container.classList.add("entered");
}
