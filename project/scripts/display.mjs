const gameDetails = document.querySelector("#details");

export async function displayFeatured(games, start, length) {
  const container = document.querySelector("#gamecards");
  container.innerHTML = ``;

  const firstImageURL = await compressImage(games[start].thumbnail, 0.6);
  const preloadLink = document.createElement("link");
  preloadLink.rel = "preload";
  preloadLink.as = "image";
  preloadLink.href = firstImageURL;
  preloadLink.fetchPriority = "high";
  document.head.appendChild(preloadLink);

  for (let index = start; index <= length; index++) {
    const game = games[index];
    const card = document.createElement("aside");
    const image = document.createElement("img");
    const title = document.createElement("h2");
    const desc = document.createElement("p");
    const genre = document.createElement("p");
    const platform = document.createElement("p");

    image.alt = game.title;
    if (index === start) {
      image.fetchPriority = "high"; 
      image.src = firstImageURL;
    } else {
      image.loading = "lazy";
      compressImage(game.thumbnail, 0.6).then((src) => {
        image.src = src;
    });
    }

    

    title.textContent = game.title;
    desc.textContent = game.short_description;
    genre.textContent = game.genre;
    platform.textContent = game.platform;

    card.append(image, title, desc, genre, platform);

    [image, title].forEach((el) => {
      el.addEventListener("click", () => displayModel(game));
    });

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

async function compressImage(url, quality = 0.7) {
  try {
    url = "https://corsproxy.io/?" + url;
    const response = await fetch(url, { cache: "force-cache" }); 
    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    ctx.drawImage(bitmap, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob(
        (compressedBlob) => resolve(URL.createObjectURL(compressedBlob)),
        "image/webp",
        quality
      );
    });
  } catch (err) {
    console.error("Image compression failed:", err);
    return url; 
  }
}
