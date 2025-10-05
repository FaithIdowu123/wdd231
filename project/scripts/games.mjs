export async function apiFetch(url) {
    let data = [];
  try {
    const response = await fetch(url);
    if (response.ok) {
      data = await response.json(); 
      console.log(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
      data = "null";
  }
  return data;
}

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