import Globals from "./globals.js";

export default class GameObject {
    //Position is an object
    //{x, y}
    constructor(position, image=null) {
        this.position = position;
        this.image = image;
        //You can turn the visibility of a gameObject on or off.
        //Note that invisble gameObjects still exist inside the game and are updated.
        this.isVisible = true;
        //You can turn collision detection on or off for the gameObject
        this.canCollide = true;
        //Used for Collision detection
        this.isColliding = false;
        //Screen wrapping functionality
        this.enableScreenWrap = false;
    }

    update() {
        if (this.enableScreenWrap === true) {
            screenWrap();    
        }
    }

    draw() {
        //Only render gameObject on screen if its visible
        if(this.isVisible === true) {
            //Image rendering
            if (this.image !== null) {
                Globals.Canvas2D.drawImage(this.image, this.position.x, this.position.y);
            }
        }
        return 0;
    }
    
    //Wrap around the screen
    wrap() {
        //x-axis
        if (this.position.x > Globals.ScreenWidth) {
            this.position.x = 1;
        }
        if (this.position.x < 0) {
            this.position.x = Globals.ScreenWidth-1;
        }
        //y-axis
        if (this.position.y > Globals.ScreenHeight) {
            this.position.y = 1;
        }
        if (this.position.y < 0) {
            this.position.y = Globals.ScreenHeight-1;
        }
    }
}
