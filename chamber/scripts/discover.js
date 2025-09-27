import { loadjson } from "./members.mjs";

const mstodays = 86400000;
let lastvisit =  JSON.parse(localStorage.getItem("lastvisit"));
const now = Date.now();

setvisits()

const visitmsg = document.querySelector("#visitmsg");
if (lastvisit === null){
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
  console.log(data);
  displaycards(data);
});

function displaycards(locals){
  document.querySelector("#locals").innerHTML = ``;
  locals.forEach(local => {
     const card = document.createElement("section");
     const title = document.createElement("h2");
     const image = document.createElement("img");
     const address = document.createElement("p");
     const desc = document.createElement("p");
     const more = document.createElement("button");

     title.textContent = local.name;
     image.setAttribute("src", "images/" + local.image);
     image.setAttribute("alt", local.name);
     image.setAttribute("fetchpriority", "high");
     address.textContent = local.address;
     address.setAttribute("class", "address");
     desc.textContent = local.description;
     desc.setAttribute("class", "desc");
     more.id = "learn";
     more.textContent = "Learn more";

     card.appendChild(title);
     card.appendChild(image);
     card.appendChild(address);
     card.appendChild(desc);
     card.appendChild(more);

     document.querySelector("#locals").appendChild(card);
  });
}

function setvisits(){
    localStorage.setItem("lastvisit", JSON.stringify(now));
}