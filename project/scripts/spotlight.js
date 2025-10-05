import { displayFeatured, displaymodel, apiFetch, getRandomInt } from "./display.mjs";

const url = `https://corsproxy.io/?https://www.freetogame.com/api/games?sort-by=popularity`;
const timestampField = document.getElementById("formLoadTime");
let comments =  JSON.parse(localStorage.getItem("comments")) || [];

apiFetch(url).then(data => {
    let random = getRandomInt(0, data.length - 1);
    displayFeatured(data,random, random + 2);
})

document.addEventListener("DOMContentLoaded", function() {
    var currentTimestamp = new Date().toISOString();
    timestampField.value = currentTimestamp;
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contactform");
  const fname = document.getElementById("firstname");
  const lname = document.getElementById("lastname");
  const email = document.getElementById("email");
  const topic = document.getElementById("topic");
  const text = document.getElementById("text");

  form.addEventListener("submit", (e) => {
    let comment = [fname.value + " " + lname.value, email.value, topic.value, text.value, timestampField.value];
    comments.push();
    setvisits();
  });
});

function setvisits(){
    localStorage.setItem("comments", JSON.stringify(comments));
}
