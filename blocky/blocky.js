var keys = {
	up = false,
	left = false,
	down = false,
	right = false,
	b = false,
	a = false,
	aJustPressed = false,
},

constants = {
	WIDTH = 800,
	HEIGHT = 552,
	FPS = 50,
	MAX_X_WALKING_VELOCITY = 5,
	MAX_X_RUNNING_VELOCITY = 9,
	RUNNING_ACCELERATION = .7,
	WALKING_ACCELERATION = .7,
	GRAVITY = 1,
	FRICTION = .3,
	JUMPING_FORCE = 7,
	MIN_JUMP_FRAMES = 3, // Minimum number of frames that a jump will increase y velocity for
	MAX_JUMP_FRAMES = 5, // Maximum number of frames that y velocity can be increased for
},

createBlocky = function(x, y) {

        _ = {};
		_.xPos = x;
		_.yPos = y;
		_.xVel = 0;
		_.yVel = 0;

		// Current number of frames spent jumping
		_.currentJumpFrames = 0;

		// True if player is still holding jump button during a jump
		_.holdingJump = false;

		_.framesLeft = 0;

		_.spriteX = 0;
		_.spriteY = 0;
	},

	createHTML: function() {
    	$("#frame").append("<div id='blocky'></div>");

		_.container = $("#blocky");
		return _.container;
	},

	update: function() {
		// Jump initiate
		if (_.yPos == 0 && keys.a && !_.holdingJump && keys.aJustPressed) {
			_.currentJumpFrames = 1;
			_.holdingJump = true;
			keys.aJustPressed = false;
		}

		// Increment jump frames
		if (_.currentJumpFrames > 0) {
			_.currentJumpFrames++;
		}

		// Player let go of jump
		if (_.yPos > 0 && !keys.a || _.currentJumpFrames == constants.MAX_JUMP_FRAMES) {
			_.holdingJump = false;
		}

		if ((0 < _.currentJumpFrames && _.currentJumpFrames < constants.MIN_JUMP_FRAMES) || _.holdingJump) {
			_.yVel += constants.JUMPING_FORCE;
		}

		// Apply friction
		if (_.yPos == 0) {
			_.xVel = (_.xVel > 0) ? Math.max(0, _.xVel - constants.FRICTION) : Math.min(0, _.xVel + constants.FRICTION);
		}
		// Apply gravity
		_.yVel -= constants.GRAVITY;

		if (keys.left && !(keys.down && _.yPos == 0)) {
			if (keys.b) {
				blocky.xVel = Math.max(blocky.xVel - constants.RUNNING_ACCELERATION, -constants.MAX_X_RUNNING_VELOCITY);
			}
			else {
				blocky.xVel = Math.max(blocky.xVel - constants.WALKING_ACCELERATION, -constants.MAX_X_WALKING_VELOCITY);
			}
		}
		if (keys.right && !(keys.down && _.yPos == 0)) {
			if (keys.b) {
				blocky.xVel = Math.min(blocky.xVel + constants.RUNNING_ACCELERATION, constants.MAX_X_RUNNING_VELOCITY);
			}
			else {
				blocky.xVel = Math.min(blocky.xVel + constants.WALKING_ACCELERATION, constants.MAX_X_WALKING_VELOCITY);
			}
		}

		// Update position
		_.xPos += _.xVel;
		_.yPos += _.yVel;


		// End jump
		if (_.yPos == 0) {
			_.currentJumpFrames = 0;
		}

		// Check boundaries
		if (_.yPos < 0) {
			_.yPos = _.yVel = 0;
		}
		if (_.xPos < 0) {
			_.xPos = _.xVel = 0;
		}
		if (_.xPos > constants.WIDTH) {
			_.xPos = constants.WIDTH;
			_.xVel = 0;
		}
	},

	render: function() {
		_.container.left(_.xPos);
		_.container.top((constants.HEIGHT - _.yPos) - 180);

		// Change direction faced if necessary
		if (keys.left) {
			_.spriteY = 0;
		}
		if (keys.right) {
			_.spriteY = 1;
		}

		// Ducking
		if (keys.down) {
			_.spriteX = 4;
		}

		// Jumping
		else if (_.yPos > 0) {
			_.spriteX = (_.yVel > 0) ? 3 : 2;
		}

		// Running
		else if (_.xVel != 0) {
			if (_.xVel < 0 && keys.right) {
				_.spriteX = 5;
			}
			else if (_.xVel > 0 && keys.left) {
				_.spriteX = 5;
			}
			else {
				var decrement = (Math.abs(_.xVel) > constants.MAX_X_WALKING_VELOCITY) ? 2 : 1;
				if (_.framesLeft <= 0) {
					_.framesLeft = 15;
				}

				if (_.framesLeft > 11) {
					_.spriteX = 1;
				}
				else if (_.framesLeft > 7) {
					_.spriteX = 0;
				}
				else if (_.framesLeft > 3) {
					_.spriteX = 1;
				}
				else {
					_.spriteX = 2;
				}
				_.framesLeft -= decrement;
			}
		}

		// Standing still
		else {
			_.spriteX = 0;
			_.framesLeft = 0;
		}

		_.container.css('backgroundPosition', -(_.spriteX * 128) + "px " + -(_.spriteY * 128) + "px");
	}
});

$(document).ready(function() {

	$("#frame").height(constants.HEIGHT);

    $(document).on('keydown', keyDown);
    $(document).on('keyup', keyUp);

	// Make Blocky
	blocky = createBlocky(constants.WIDTH / 2, 0);

	setInterval(loop, 1000 / constants.FPS);
});


// Loop that keeps the game running
function loop() {
	blocky.update();
	blocky.render();
}

function keyDown(e) {
    var keyType = getKeyType(e.keyCode);
    keys[keyType] = true;
    // handle aJustPressed wtf mate
}

function keyUp(e) {
    var keyType = getKeyType(e.keyCode);
    keys[keyType] = false;
    // handle aJustPressed wtf mate
}

function getKeyType(keyCode) {
    switch (keyCode) {
        case 65:
            return 'left';
        case 83:
            return 'down';
        case 68:
            return 'right';
        case 75:
            return 'b';
        case 76:
            return 'a';
    }
}