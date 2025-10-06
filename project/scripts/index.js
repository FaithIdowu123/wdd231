import { displayFeatured, displaymodel, loadjson } from "./gamequest.mjs";

loadjson("data/populargames.json").then(data => {displayFeatured(data,0, 5);})