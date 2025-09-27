import { loadjson } from "./members.mjs";

const mstodays = 86400000;
let lastvisit =  JSON.parse(localStorage.getItem("lastvisit"));
const now = Date.now();
setvisits()

const visitmsg = document.querySelector("#visitmsg");
if (!lastvisit){
    visitmsg.textContent = "Welcome! Let us know if you have any questions.";
}else{
    let distance = (now - lastvisit) / mstodays;
    if (distance < 1){
        visitmsg.textContent = `Back so soon! Awesome!`;
    }
    else{
        visitmsg.textContent = `You last visited ${Math.round(distance)} days ago.`;
    }
}

loadjson("data/local.json").then(data => {
  const container = document.querySelector("#locals");
  container.innerHTML = "";

  data.forEach(local => {
    const card = document.createElement("section");
    card.innerHTML = `
      <h2>${local.name}</h2>
      <img src="images/${local.image}?v=1.0" alt="${local.name}" fetchpriority="high">
      <p class="address">${local.address}</p>
      <p class="desc">${local.description}</p>
      <button id="learn">Learn more</button>
    `;
    container.appendChild(card);
  });
});


function setvisits(){
    localStorage.setItem("lastvisit", JSON.stringify(now));
}