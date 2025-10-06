import { displayFeatured, displaymodel, loadjson } from "./gamequest.mjs";

loadjson("data/populargames.json?v=1.0.3").then(data => {displayFeatured(data,0, 5);})