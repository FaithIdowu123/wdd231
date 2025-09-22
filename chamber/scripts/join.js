import { loadjson } from "./members.mjs";

const benefitDetails = document.querySelector("#details");

loadjson("data/membership.json").then(data => {
    displaymembership(data);
});

function displaymembership(memberships){
    document.getElementById("membership").textContent = ``;
    memberships.forEach(membership => {
        const card = document.createElement("article");
        const name = document.createElement("h2");
        const desc = document.createElement("p");
        const benefits = document.createElement("button");

        name.textContent = membership.name + " Membership";
        desc.textContent = membership.description;
        benefits.textContent = "Benefits";
        benefits.classList.add("open-modal");

        benefits.addEventListener("click", () => {
            showdetails(membership)
        });

        card.appendChild(name);
        card.appendChild(desc);
        card.appendChild(benefits);

        document.getElementById("membership").appendChild(card)
    });
}

function showdetails(membership) {
    benefitDetails.innerHTML = ``;
    const header = document.createElement("h2");
    const exit = document.createElement("button");
    const list = document.createElement("ul");

    header.textContent = membership.name + " Membership Benefits";
    exit.id = "closemodal";
    exit.innerHTML = `❌`;

    benefitDetails.appendChild(header);
    
    
    membership.benefits.forEach(benefit => {
        const detail = document.createElement("li");
        detail.textContent = benefit
        list.appendChild(detail)
    });

    benefitDetails.appendChild(list);
    benefitDetails.appendChild(exit);

    benefitDetails.showModal();

    exit.addEventListener("click", () =>{
        benefitDetails.close();
    });
}

document.addEventListener("DOMContentLoaded", function() {
    var timestampField = document.getElementById("formLoadTime");
    var currentTimestamp = new Date().toISOString();
    timestampField.value = currentTimestamp;
});