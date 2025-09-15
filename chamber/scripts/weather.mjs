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
  }
  return data;
}