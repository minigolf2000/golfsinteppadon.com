var keys = {
    up: false,
    left: false,
    down: false,
    right: false,
    b: false,
    a: false
};

var constants = {
    WIDTH: 800,
    HEIGHT: 552,
    FPS: 50,
    MAX_X_WALKING_VELOCITY: 5,
    MAX_X_RUNNING_VELOCITY: 9,
    RUNNING_ACCELERATION: .7,
    WALKING_ACCELERATION: .7,
    GRAVITY: 1,
    FRICTION: .3,
    JUMPING_FORCE: 7,
    MIN_JUMP_FRAMES: 3, // Minimum number of frames that a jump will increase y velocity for
    MAX_JUMP_FRAMES: 5 // Maximum number of frames that y velocity can be increased for
};

$(function () {

    var _ = {};

    _.initialize = function () {
        $("#frame").height(constants.HEIGHT);
        $(document).on('keyup keydown', _.setKey);
        blocky.initialize();
    };

    /**
     * Set the key matching e.keyCode in the keys field to be true if e.type == 'keydown'
     * or false if e.type != 'keydown'
     */
    _.setKey = function (e) {
        keys[_.getKeyType(e.keyCode)] = (e.type == 'keydown');
    }

    _.getKeyType = function (keyCode) {
        return ({65: 'left', 83: 'down', 68: 'right', 75: 'b', 76: 'a'})[keyCode];
    }

    _.initialize();

});