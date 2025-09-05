let year = new Date().getFullYear();
document.querySelector("#currentyear").textContent = year;
document.querySelector("#lastModified").textContent = "Last modified: " + document.lastModified;

const navigation = document.querySelector("#navigation");
const menu = document.querySelector("#menu");

menu.addEventListener("click", function(){
    navigation.classList.toggle("show");
    menu.classList.toggle("show");
});