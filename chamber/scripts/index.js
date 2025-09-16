import { loadmembers } from "./members.mjs";
import { apiFetch } from "./weather.mjs";

const key = 'b11aab77e925ca370700d0c87f7e4b22';
const lat = 7.161000;
const lon = 3.348000;

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
const urlfourday = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
let fourday = {};

apiFetch(url).then(data => {
  document.querySelector(".current").innerHTML = ``;
  if (data != "null"){
    const name = document.createElement("h4");
    const description = document.createElement("p");
    const icon = document.createElement("img");
    const temperature = document.createElement("p");

    name.textContent = data.name;
    description.textContent = data.weather[0].description; 
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    icon.setAttribute("alt", data.weather[0].description);
    icon.setAttribute("fetchpriority", "high");
    temperature.textContent = data.main.temp + " °F";

    const current = document.createElement("h2");
    current.textContent = "Current Weather";
    document.querySelector(".current").appendChild(current);
    document.querySelector(".current").appendChild(name);
    document.querySelector(".current").appendChild(description);  
    document.querySelector(".current").appendChild(icon);
    document.querySelector(".current").appendChild(temperature);
  }
  else{
    const current = document.createElement("h3");
    current.textContent = "Oops something went wrong!";
    document.querySelector(".current").appendChild(current);
  }
  

});
apiFetch(urlfourday).then(data => {displaycards(formatDailySummary(data.list));});
loadmembers().then(data => {displaydata(data);});

function displaydata(members){
    document.querySelector("#cards").innerHTML = ``;
    let used = [];
    for (let index = 0; index < 3;) {
        let random = getRandomInt(0, 6)
        while (used.includes(random)){ 
            random = getRandomInt(0, 6)
        };
        let member = members[random];
        if (member.membershipLevel >= 2){
            used.push(random);
            index++;
            const card = document.createElement("section");
            const title = document.createElement("p");
            const image = document.createElement("img");
            const address = document.createElement("p");
            const number = document.createElement("p");
            const link = document.createElement("a")
            const level = document.createElement("p");

            title.textContent = member.name;
            image.setAttribute("src", "images/" + member.image);
            image.setAttribute("alt", member.name);
            image.setAttribute("fetchpriority", "high");
            address.textContent = member.address;
            number.textContent = member.phone;
            link.setAttribute("href", member.website);
            link.textContent = "Link to page";
            level.innerHTML = `<strong>Membership Level:</strong> ${member.membershipLevel}`;

            if (member.membershipLevel == 2) {
              card.classList.add("Silver")
            }
            else {
              card.classList.add("Gold")
            }

            card.appendChild(title);
            card.appendChild(image);
            card.appendChild(address);
            card.appendChild(number);
            card.appendChild(link);
            card.appendChild(level);

            document.querySelector("#cards").appendChild(card);
            
        };
    };
    
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



function formatDailySummary(forecastList) {
  const grouped = {};
  const today = new Date().toISOString().split("T")[0];

  forecastList.forEach(entry => {
    const date = new Date(entry.dt * 1000).toISOString().split("T")[0];
    grouped[date] = grouped[date] || { temps: [], weather: [] };
    grouped[date].temps.push(entry.main.temp);
    grouped[date].weather.push({
      main: entry.weather[0].description,
      icon: entry.weather[0].icon
    });
  });

  if (!grouped[today]) {
    grouped[today] = { temps: [], weather: [] };
  }

  return Object.entries(grouped).map(([date, data]) => {
    if (data.temps.length === 0) {
      return {
        date,
        minTemp: null,
        maxTemp: null,
        weather: "N/A",
        icon: ""
      };
    }

    const freq = {};
    data.weather.forEach(w => {
      const key = w.main + "|" + w.icon;
      freq[key] = (freq[key] || 0) + 1;
    });
    const [mostCommon] = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    const [description, icon] = mostCommon[0].split("|");
    return {
      date,
      minTemp: Math.min(...data.temps),
      maxTemp: Math.max(...data.temps),
      weather: description,
      icon: `https://openweathermap.org/img/wn/${icon}.png`
    };
  });
}

function displaycards(weathers){
  document.querySelector("#day").innerHTML = ``;
  for (let index = 1; index < 4; index++) {
     const weather = weathers[index];
     const days = ["","Tomorrow", weather.date]
     const card = document.createElement("aside");
     const title = document.createElement("h5");
     const description = document.createElement("p");
     const image = document.createElement("img"); 
     const temperature = document.createElement("p");

     if (index > 2){
      title.textContent = days[2];
     }
     else{
      title.textContent = days[index];
     }
     description.textContent = weather.weather
     image.setAttribute("src", weather.icon);
     image.setAttribute("alt", weather.weather);
     image.setAttribute("fetchpriority", "high");
     temperature.textContent = `${((weather.minTemp + weather.maxTemp) / 2).toFixed(2)} °F`;
     
     card.appendChild(title);
     card.appendChild(description);
     card.appendChild(image);
     card.appendChild(temperature);
    

     document.querySelector("#day").appendChild(card);
  };
  document.querySelector("#day").classList.add("entered");
}
