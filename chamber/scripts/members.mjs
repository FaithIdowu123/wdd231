export async function loadjson(path) {
  let json = [];
  try{
    const response = await fetch(path);
    if (response.ok) {
        json = await response.json();
    }
    else{
        throw new Error("Could not fetch from " + path);
    }
  } catch (error){
    console.log(error);
  }
  return json;
}