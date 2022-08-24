//This is the main game file.
//Includes game start and the main loop

import Globals from './globals.js';
import {keysPressed, lastKey} from './handleUserInput.js';

const gameObjects = [];

//Update the game
function update() {
    //Update the game objects
    //Looping through the gameObjects backwards, because it maybe slightly more efficient.
    //if .splice is used It is more efficient to re-index the array from the back than the front
    for (let i = gameObjects.length - 1; 0 <= i; i--) {
        gameObjects[i].update();
    }

    console.log(keysPressed);
    console.log(lastKey);
}

//Frame number keeps track of the current frame being rendered
let frameNumber = 0;
//Render the game
function draw() {
    //Clear the previous frame before rendering the next frame
    clearCanvas();
    frameNumber += 1;

    //draw the game objects on screen
    for (let i = gameObjects.length - 1; 0 <= i; i--) {
        gameObjects[i].draw();
    }
}

//+++ THESE VARIABLES ARE USED IN CHECKING EXECUTION TIMES OF THE ENGINE +++
//Counts up by 1 for every program cycle. Is reset to 0 at 100 program cycles
var hundredCyclesCounter = 0;
const maxCyclesToCount = 100;
//Total looping execution times over a 100 program cycle period (resets to 0 at 100 cycles)
//(Needed for calculating the average)
var totalMainLoopTime = 0;
var totalUpdateLoopTime = 0;
var totalDrawLoopTime = 0;
//Average looping execution times over a 100 program cycle (re-calculated every 100th cycle)
var avrgMainLoopTime = 0;
var avrgUpdateLoopTime = 0;
var avrgDrawLoopTime = 0;
//+++ +++
function mainLoop() {
    Globals.GlobalCock = setTimeout(() => {
        if (Globals.isRunning === true) {
            //Reset performance timing statistics
            let mainLoopStartTime = 0.0;
            let mainLoopEndTime = 0.0;
            let mainLoopTime = 0.0;
            let updateLoopStartTime = 0.0;
            let updateLoopEndTime = 0.0;
            let updateLoopTime = 0.0;
            let drawLoopStartTime = 0.0;
            let drawLoopEndTime = 0.0;
            let drawLoopTime = 0.0;
            
            if (Globals.DebugMode === true && Globals.DebugLevel >= 2) {
                //Check how long it takes for 1 program cycle to execute.
                mainLoopStartTime = performance.now();
                //Check how long it takes for 1 update to execute.
                updateLoopStartTime = performance.now();
            }
            //Main proccesing
            update();
            if (Globals.DebugMode === true && Globals.DebugLevel >= 2) {
                updateLoopEndTime = performance.now();
                updateLoopTime = updateLoopEndTime - updateLoopStartTime;
            }
            
            //Check how long it takes for 1 draw to execute.
            if (Globals.DebugMode === true && Globals.DebugLevel >= 2) {
                drawLoopStartTime = performance.now();
            }
            //Draw the screen after updating
            draw();
            
            //=================================================
            //From here on its just checking how fast the program executes to analyze bottlenecks
            //=================================================

            if (Globals.DebugMode === true && Globals.DebugLevel >= 2) {
                drawLoopEndTime = performance.now();
                drawLoopTime = drawLoopEndTime - drawLoopStartTime;

                mainLoopEndTime = performance.now();
                mainLoopTime = mainLoopEndTime - mainLoopStartTime;
        
                //Add the times of every cycle together
                totalMainLoopTime += mainLoopTime;
                totalUpdateLoopTime += updateLoopTime;
                totalDrawLoopTime += drawLoopTime;
    
                //increment the cycle counter by 1 every cycle
                hundredCyclesCounter += 1;
    
                if(hundredCyclesCounter >= maxCyclesToCount) {
                    //Calculate the average execution times
                    avrgMainLoopTime = totalMainLoopTime / maxCyclesToCount;
                    avrgUpdateLoopTime = totalUpdateLoopTime / maxCyclesToCount;
                    avrgDrawLoopTime = totalDrawLoopTime / maxCyclesToCount;
                    //reset cycle counter
                    hundredCyclesCounter = 0;
    
                    console.log("*****HUNDRETH(100) CYCLE REPORT - START**************");
                    console.log("AVERAGE MAIN LOOP EXECUTION TIME:");
                    console.log(avrgMainLoopTime + " ms");
                    console.log("AVERAGE UPDATE LOOP EXECUTION TIME:");
                    console.log(avrgUpdateLoopTime + " ms");
                    console.log("AVERAGE DRAW LOOP EXECUTION TIME:");
                    console.log(avrgDrawLoopTime + " ms");
                    console.log("*****HUNDRETH(100) CYCLE REPORT - END**************");            
            }
                if(Globals.DebugLevel === 3) {
                    console.log("*****SINGLE CYCLE REPORT - START**************");
                    console.log("MAIN LOOP EXECUTION TIME:");
                    console.log(mainLoopTime + " ms");
                    console.log("UPDATE LOOP EXECUTION TIME:");
                    console.log(updateLoopTime + " ms");
                    console.log("DRAW LOOP EXECUTION TIME:");
                    console.log(drawLoopTime + " ms");
                    console.log("*****SINGLE CYCLE REPORT - END**************"); 
                }
            }
        } //end-if (isRunning)
        mainLoop();
    }, Globals.frameRate);
}

//Do things that should happen only once at the start of the game
export function startGame() {
    //Start the main loop
    Globals.isRunning = true;
    mainLoop();
}

//Clear the html canvas screen
export function clearCanvas() {
    Globals.Canvas2D.fillStyle = "black";
    Globals.Canvas2D.clearRect(0, 0, Globals.ScreenWidth, Globals.ScreenHeight);
}

//Completely disable the mainloop, debug logger, and clear the screen (program restart probably required after this)
function end() {
    console.log("END");
    Globals.isRunning = false;
    clearTimeout(Globals.globalCock);
    clearInterval(Globals.debugClock);
    clearInterval(statisticsTimer);
    clearCanvas();
}
