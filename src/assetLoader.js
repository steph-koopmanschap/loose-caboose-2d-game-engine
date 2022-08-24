//The module for loading game assets such as
// * Sounds
// * Images

import Globals from "./globals.js";

var images = {};
var animatedImgs = {};
var sounds = {};
var music = {}; 

//You can access the assets with the following code
//assets.type.name
//Where type is the asset type 
//and name is the name you assigned to the asset
var assets = {images, animatedImgs, sounds, music};
export default assets;


//type is a string
// types:
// "image"
// "animatedImg"
// "sounds"
// "music"

//name is a string
// name can be any name you want to name your asset

//fileName is a string
// Only include the filename and the extension in fileName

//If your type is 'animatedImg' 
//then fileName is an array of string with each image that needs to be included in the animation (in order)
export function createAsset(type, name, fileName) {
    switch(type) {
        case "image":
            images[name] = createImage(Globals.imgPath + fileName);
            break;

        case "animatedImg":
            for (i = 0; i < fileName.length; i++) {
                animatedImgs[name] = createImage(Globals.imgPath + fileName[i]);
            }
            break;

        case "sounds":
            sounds[name] = new Audio(Globals.soundsPath + fileName);
            break;

        case "music":
            music[name] = new Audio(Globals.musicPath + fileName);
            break;
        
        default:
            console.log(`ERROR: Type ${type} not supported`);
    }
}

function createImage(src) {
    let image = new Image();
    image.src = src;
    return image;
}