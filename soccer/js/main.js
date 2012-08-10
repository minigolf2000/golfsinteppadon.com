/**
*   AI Soccer
*   By Golf Sinteppadon
*/
var pitch,
    FRICTION = 0.93;

$(function () {
    // Create pitch and start game
    pitch = new SoccerPitch();
    setInterval(loop, 40);
});

// Loop that keeps the game running
function loop() {
    pitch.update();
    pitch.render();
}
