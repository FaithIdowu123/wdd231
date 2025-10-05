var year = new Date().getFullYear();
document.querySelector("#year").textContent = `@ ${year}`;
document.querySelector("#lastmodified").textContent = "Last modified: "+ document.lastModified;

const navigation = document.querySelector("#navigation");
const navanimation = document.querySelector("#animated")
const menu = document.querySelector("#menu");

menu.addEventListener("click", function(){
    navanimation.classList.toggle("show");
    navigation.classList.toggle("show");
    menu.classList.toggle("show");
});