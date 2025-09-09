async function loadmembers() {
  const response = await fetch("data/members.json");
  if (!response.ok) {
    throw new Error("Could not fetch members.json");
  }
  const members = await response.json();
  return members;
}

loadmembers().then(data => {
  displaycards(data);
});

function displaycards(members){
  document.querySelector("#cards").innerHTML = ``;
  members.forEach(member => {
     const card = document.createElement("section");
     const title = document.createElement("p");
     const image = document.createElement("img");
     const address = document.createElement("p");
     const number = document.createElement("p");
     const link = document.createElement("a")

     title.textContent = member.name;
     image.setAttribute("src", "images/" + member.image + "?v=1.0");
     image.setAttribute("alt", member.name);
     image.setAttribute("fetchpriority", "high");
     address.textContent = member.address;
     number.textContent = member.phone;
     link.setAttribute("href", member.website);
     link.textContent = "Link to page";

     card.appendChild(title);
     card.appendChild(image);
     card.appendChild(address);
     card.appendChild(number);
     card.appendChild(link);

     document.querySelector("#cards").appendChild(card);
  });
}