const params = new URLSearchParams(window.location.search);
document.getElementById('out-first').textContent = params.get('fname');
document.getElementById('out-last').textContent = params.get('lname');
document.getElementById('out-email').textContent = params.get('email');
document.getElementById('out-phone').textContent = params.get('phone');
document.getElementById('out-org').textContent = params.get("business");
document.getElementById('out-membership').innerHTML = params.get("membership");
document.getElementById('out-desc').textContent = params.get("description");
document.getElementById('out-time').textContent = new Date(params.get('timestamp')).toLocaleString();


