//All global variables and constants of the Engine go here
//They can accesed with
//import globals from "./globals.js";


// ====== GLOBAL DECLARATIONS =========

var Globals = {};

//Screen Settings
//Screen margin creates some space around the game screen
Globals.screenMargin = 150; //in pixels
Globals.ScreenWidth = window.innerWidth;
Globals.ScreenHeight = window.innerHeight;
Globals.MainScreen = document.getElementById('gameCanvas');
Globals.Canvas2D = null;
//Framerate and looping variables
Globals.GameSpeed = 1;
Globals.FPS = 60 * Globals.GameSpeed;
Globals.frameRate = (1 / Globals.FPS) * 1000;
Globals.GlobalCock = null;
//Check if the main loop is running or not
Globals.isRunning = false;
//Debugging mode for verbose logging
//Do note that debugMode slows down the program
Globals.DebugMode = false;
//Verboseness of the debugging log
//level 1 = small
//level 2 = high
//level 3 = extreme (slows down the program more)
Globals.DebugLevel = 2;
Globals.DebugClock = null;
//Default directories
Globals.AssetsPath = "../assets/";
Globals.imgPath = Globals.AssetsPath + "/img/";
Globals.soundsPath = Globals.AssetsPath + "/sounds/";
Globals.musicPath = Globals.AssetsPath + "/music/";

export default Globals;

// ======  =========