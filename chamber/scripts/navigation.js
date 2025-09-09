let year = new Date().getFullYear();
document.querySelector("#currentyear").textContent = year;
document.querySelector("#lastModified").textContent = "Last modified: " + document.lastModified;

const navigation = document.querySelector("#navigation");
const navanimation = document.querySelector("#animated")
const menu = document.querySelector("#menu");
const grid = document.querySelector("#grid");
const list = document.querySelector("#list");
const cards = document.querySelector("#cards")
const main = document.querySelector("main");

menu.addEventListener("click", function(){
    navanimation.classList.toggle("show");
    navigation.classList.toggle("show");
    menu.classList.toggle("show");
});

grid.addEventListener("click", function() {
    cards.classList.remove("list");
    cards.classList.add("grid");
    main.classList.remove("list");
});

list.addEventListener("click", function() {
    cards.classList.remove("grid");
    cards.classList.add("list");
    main.classList.add("list")
})

