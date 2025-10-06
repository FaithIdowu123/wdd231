const gameDetails = document.querySelector("#details");

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
  try {
    const response = await fetch(path);
    if (response.ok) {
      json = await response.json();
    } else {
      throw new Error("Could not fetch from " + path);
    }
  } catch (error) {
    console.log(error);
  }
  return json;
}

export async function displayFeatured(games, start, length) {
  const container = document.querySelector("#gamecards");
  if (!container) return;
  container.innerHTML = '';

  if (!Array.isArray(games) || games.length === 0) return;

  const lastIndex = Math.min(length, games.length - 1);
  // Compress only the first image synchronously
  const firstThumb = games[start].thumbnail;
  let firstImageURL = firstThumb;
  try {
    firstImageURL = await compressImage(firstThumb, 0.6);
  } catch (e) {
    firstImageURL = firstThumb;
  }

  for (let index = start; index <= lastIndex; index++) {
    const game = games[index];
    const card = document.createElement('aside');
    const image = document.createElement('img');
    const title = document.createElement('h2');
    const desc = document.createElement('p');
    const g = document.createElement('p');
    const platform = document.createElement('p');

    image.alt = game.title || '';
    if (index === start) {
      image.fetchPriority = 'high';
      image.src = firstImageURL;
    } else {
      image.loading = 'lazy';
      image.src = game.thumbnail; // start with original thumbnail
      // later compress in the background and swap (non-blocking)
      compressImage(game.thumbnail, 0.6).then((src) => {
        // only replace if element still in DOM and original loaded
        if (document.body.contains(image)) image.src = src;
      }).catch(()=>{/* ignore */});
    }

    title.textContent = game.title;
    desc.textContent = game.short_description;
    g.textContent = game.genre;
    platform.textContent = game.platform;

    card.append(image, title, desc, g, platform);
    [image, title].forEach(el => el.addEventListener('click', () => displaymodel(game)));
    container.appendChild(card);
  }
}


export async function displaymodel(game) {
  gameDetails.innerHTML = ``;
  const image = document.createElement("img");
  const title = document.createElement("h2");
  const desc = document.createElement("p");
  const genre = document.createElement("p");
  const publisher = document.createElement("p");
  const developer = document.createElement("p");
  const platform = document.createElement("p");
  const release = document.createElement("p");
  const play = document.createElement("a");
  const exit = document.createElement("button");

  image.alt = game.title;
  image.fetchPriority = "high";
  compressImage(game.thumbnail, 0.6).then((src) => (image.src = src));

  title.textContent = game.title;
  desc.textContent = game.short_description;
  genre.textContent = game.genre;
  publisher.textContent = `Publisher: ${game.publisher}`;
  developer.textContent = `Developer: ${game.developer}`;
  platform.textContent = game.platform;
  release.textContent = `Release Date: ${game.release_date}`;
  play.href = game.game_url;
  play.target = "_blank";
  play.textContent = "Play Now!";

  exit.id = "closemodal";
  exit.textContent = "X";

  gameDetails.append(exit, image, title, desc, genre, publisher, developer, platform, release, play);
  gameDetails.showModal();

  exit.addEventListener("click", () => gameDetails.close());
}

export async function compressImage(url, quality = 0.7) {
  try {
    // Use cache API keyed by original URL
    const cache = await caches.open('compressed-images-v1');
    const cached = await cache.match(url);
    if (cached) {
      const blob = await cached.blob();
      return URL.createObjectURL(blob);
    }

    const proxied = 'https://corsproxy.io/?' + url;
    const resp = await fetch(proxied, { cache: 'force-cache' });
    if (!resp.ok) throw new Error('Image fetch failed');

    const blob = await resp.blob();
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0);

    const compressedBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', quality));
    // cache under the original URL (so future calls reuse this)
    cache.put(url, new Response(compressedBlob.clone()));
    return URL.createObjectURL(compressedBlob);
  } catch (err) {
    console.warn('compressImage failed', err);
    return url;
  }
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
