export var keysPressed = {};
export var lastKey = "";

window.addEventListener('keydown', ({ key }) => {
    keysPressed[key] = true;
    lastKey = key;
});

window.addEventListener('keyup', ({ key }) => {
    keysPressed[key] = false;
});