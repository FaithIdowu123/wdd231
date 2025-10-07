import { displayFeatured, displaymodel, loadjson, getRandomInt } from "./gamequest.mjs";

const timestampField = document.getElementById("formLoadTime");
let comments = JSON.parse(localStorage.getItem("comments")) || [];

loadjson("data/populargames.json?v=1.0.3").then(data => {
  const random = getRandomInt(0, data.length - 1);
  displayFeatured(data, random, random + 2);
});

document.addEventListener("DOMContentLoaded", () => {
  const currentTimestamp = new Date().toISOString();
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
    const comment = [
      `${fname.value} ${lname.value}`,
      email.value,
      topic.value,
      text.value,
      timestampField.value
    ];
    comments.push(comment);
    setvisits();
  });
});

function setvisits() {
  localStorage.setItem("comments", JSON.stringify(comments));
}
