const params = new URLSearchParams(window.location.search);
document.getElementById('out-first').textContent = params.get('fname');
document.getElementById('out-last').textContent = params.get('lname');
document.getElementById('out-email').textContent = params.get('email');
document.getElementById('out-topic').textContent = params.get('topic');
document.getElementById('out-desc').textContent = params.get("description");
document.getElementById('out-time').textContent = new Date(params.get('timestamp')).toLocaleString();


let comments =  JSON.parse(localStorage.getItem("comments")) || [];
console.log(comments)
comments.push([params.get('fname') + " " + params.get('lname'), params.get('email'), params.get('topic'), params.get("description"), new Date(params.get('timestamp')).toLocaleString()]);
setvisits()
function setvisits(){
    localStorage.setItem("comments", JSON.stringify(comments));
}