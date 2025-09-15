export async function loadmembers() {
  let members = [];
  try{
    const response = await fetch("data/members.json");
    if (response.ok) {
        members = await response.json();
    }
    else{
        throw new Error("Could not fetch members.json");
    }
  } catch (error){
    console.log(error);
  }
  return members;
}