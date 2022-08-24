/*
// NAME: Loose Caboose GameEngine Original
// CONTRIBUTORS: Steph Koopmanschap
// VERSION: 1.0
*/

//This file (init.js) is the first to execute and initializes the basic setup of the game engine

// IMPORTS 

import Globals from "./globals.js";
import {startGame, clearCanvas} from "./game.js";

//Create the screen
function initScreen() {
    Globals.MainScreen.width = Globals.ScreenWidth - Globals.screenMargin;
    Globals.MainScreen.height = Globals.ScreenHeight - Globals.screenMargin;
    Globals.MainScreen.style.margin = "0px";
    Globals.MainScreen.style.padding = "0px";
    Globals.MainScreen.style.border = "1px solid white";
    Globals.MainScreen.style.backgroundColor = "black";
    Globals.Canvas2D = Globals.MainScreen.getContext("2d");
    clearCanvas();
}

//Initialize and start program
function init() {
    initScreen();
    startGame();
}

//The very first function executed by this program
init();