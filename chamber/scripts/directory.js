fetch("data/members.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Could not fetch members.json");
    }
    return response.json();
    
  })
  .then(members => {
    console.log(members);
  })
  
  .catch(error => {
    console.error("Error loading JSON:", error);
  });