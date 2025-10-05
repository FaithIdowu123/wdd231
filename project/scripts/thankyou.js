const params = new URLSearchParams(window.location.search);
document.getElementById('out-first').textContent = params.get('fname');
document.getElementById('out-last').textContent = params.get('lname');
document.getElementById('out-email').textContent = params.get('email');
document.getElementById('out-topic').textContent = params.get('topic');
document.getElementById('out-desc').textContent = params.get("description");
document.getElementById('out-time').textContent = new Date(params.get('timestamp')).toLocaleString();


