var year = new Date().getFullYear();
document.querySelector("#year").textContent = `@ ${year}`;
document.querySelector("#lastmodified").textContent = "Last modified: "+ document.lastModified;