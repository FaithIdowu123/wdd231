const gameDetails = document.querySelector("#details");

export function displayFeatured(games, start, length) {
    document.querySelector("#gamecards").innerHTML = ``;
    for (let index = start; index <= length; index++) {
        const game = games[index];
        const card = document.createElement("aside");
        const image = document.createElement("img");
        const title = document.createElement("h2");
        const desc = document.createElement("p");
        const genre = document.createElement("p");
        const platform = document.createElement("p");

        image.setAttribute("src", game.thumbnail);
        image.setAttribute("alt", game.title);
        if (index < start + 4){
            image.setAttribute("fetchpriority", "high");
        } else{
            image.setAttribute("loading", "lazy");
        }
        
        title.textContent = game.title;
        desc.textContent = game.short_description;
        genre.textContent = game.genre;
        platform.textContent = game.platform;

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(genre);
        card.appendChild(platform);

        image.addEventListener("click", () => {
            displaymodel(game)
        });
        title.addEventListener("click", () => {
            displaymodel(game)
        });
        document.querySelector("#gamecards").appendChild(card);
    }
}

export function displaymodel(game){
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

    image.setAttribute("src", game.thumbnail);
    image.setAttribute("alt", game.title);
    image.setAttribute("fetchpriority", "high");
    title.textContent = game.title;
    desc.textContent = game.short_description;
    genre.textContent = game.genre;
    publisher.textContent = `Publisher: ` + game.publisher;
    developer.textContent = `Developer: ` + game.developer;
    platform.textContent = game.platform;
    release.textContent = `Release Date: ` + game.release_date;
    play.setAttribute("href", game.game_url);
    play.setAttribute("target", "_blank");
    play.textContent = "Play Now!";

    exit.id = "closemodal";
    exit.innerHTML = `X`;
    
    gameDetails.appendChild(exit);
    gameDetails.appendChild(image);
    gameDetails.appendChild(title);
    gameDetails.appendChild(desc);
    gameDetails.appendChild(genre);
    gameDetails.appendChild(publisher);
    gameDetails.appendChild(developer);
    gameDetails.appendChild(platform);
    gameDetails.appendChild(release);
    gameDetails.appendChild(play);

    gameDetails.showModal();

    exit.addEventListener("click", () =>{
        gameDetails.close();
    });
}