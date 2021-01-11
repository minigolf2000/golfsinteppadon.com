Keys = Class.create({
	initialize: function() {
		this.up = false;
		this.left = false;
		this.down = false;
		this.right = false;
	}
});

Constants = Class.create({
	initialize: function() {
		this.WIDTH = 600;
		this.HEIGHT = 400;
		this.FPS = 60;
	}
});

Korean = Class.create({
	initialize: function(x, y) {
		this.xPos = x;
		this.yPos = y;
	},

	createHTML: function() {
		this.container = document.createElement("div");
		this.container.id = "korean";
		this.render();
		return this.container;
	},

	move: function(direction, magnitude) {
		switch (direction) {
			case "up":
				this.yPos += 2;
				break;
			case "right":
				this.xPos += 2;
				break;
			case "down":
				this.yPos -= 2;
				break;
			case "left":
				this.xPos -= 2;
				break;
		}

		// Check boundaries
		if (this.yPos < 0) {
			this.yPos = 0;
		}
		if (this.xPos < 0) {
			this.xPos = 0;
		}
		if (this.xPos > CONSTANTS.WIDTH - this.container.getWidth()) {
			this.xPos = CONSTANTS.WIDTH - this.container.getWidth();
		}
		if (this.yPos > CONSTANTS.HEIGHT - this.container.getHeight()) {
			this.yPos = CONSTANTS.HEIGHT - this.container.getHeight();
		}
	},

	update: function() {
		// Update position
		if (keys.down && !keys.up) {
			this.move("up", 2);
		}
		if (keys.up && !keys.down) {
			this.move("down", 2);
		}
		if (keys.left && !keys.right) {
			this.move("left", 2);
		}
		if (keys.right && !keys.left) {
			this.move("right", 2);
		}
	},

	render: function() {
		this.container.style.left = this.xPos + "px";
		this.container.style.top = this.yPos + "px";
	}
});

Fan = Class.create({
	initialize: function(x, y) {
		this.xPos = x;
		this.yPos = y;
		this.state = "chase";
		this.AISwitchFramesLeft = Math.floor(Math.random() * 200);
		this.wanderDirection = "";
	},

	createHTML: function() {
		this.container = document.createElement("div");
		this.container.addClassName("fan");
		this.render();
		return this.container;
	},

	_updateAIFrames: function() {
		this.AISwitchFramesLeft--;

		if (this.AISwitchFramesLeft === 0) {
			this.AISwitchFramesLeft = 140;
			this.state = (Math.random() > 0.4) ? "chase" : "wander";
			this.wanderDirection = "";
		}

	},

	_chase: function() {
		var xDistance = korean.xPos - this.xPos,
			yDistance = korean.yPos - this.yPos;

		if (Math.abs(xDistance) > Math.abs(yDistance)) {
			this.xPos += xDistance / Math.abs(xDistance);
		}
		else {
			this.yPos += yDistance / Math.abs(yDistance);
		}
		this._checkBoundaries();
	},

	_wander: function() {
		var rand;
		// If fan needs to change wander direction
		if (this.wanderDirection === "") {

			rand = Math.random();

			if (rand > 0.75) {
				this.wanderDirection = function() { this.yPos += 1; };
			}
			else if (rand > 0.50) {
				this.wanderDirection = function() { this.yPos -= 1; };
			}
			else if (rand > 0.25) {
				this.wanderDirection = function() { this.xPos += 1; };
			}
			else {
				this.wanderDirection = function() { this.xPos -= 1; };
			}
		}
		else {
			this.wanderDirection();
		}
		this._checkBoundaries();
	},

	_checkBoundaries: function() {
		if (this.yPos < 0) {
			this.yPos = 0;
			this.wanderDirection = function() { this.yPos += 1; };
		}
		if (this.xPos < 0) {
			this.xPos = 0;
			this.wanderDirection = function() { this.xPos += 1; };
		}
		if (this.xPos > CONSTANTS.WIDTH - this.container.getWidth()) {
			this.xPos = CONSTANTS.WIDTH - this.container.getWidth();
			this.wanderDirection = function() { this.xPos -= 1; };
		}
		if (this.yPos > CONSTANTS.HEIGHT - this.container.getHeight()) {
			this.yPos = CONSTANTS.HEIGHT - this.container.getHeight();
			this.wanderDirection = function() { this.yPos -= 1; };
		}
	},

	_checkKoreanCollision: function() {
		// Check if collided with Korean
		var X_SHRINKAGE = 12, // amount to shrink the hitboxes by horizontally
			Y_SHRINKAGE = 4; // amount to shrink the hitboxes by vertically
		if (Math.abs(this.xPos - korean.xPos) < korean.container.getWidth() - X_SHRINKAGE &&
			Math.abs(this.yPos - korean.yPos) < korean.container.getHeight() - Y_SHRINKAGE) {
				// Display suffocated message
				var message = document.createElement("p");
				message.id = "message";
				message.textContent = "SUFFOCATED! " + ($("timer").textContent / 1000) + "s";
				$("frame").appendChild(message);

				clearInterval(gameTimer);
				setTimeout(resetGame, 2000);
		}
	},

	update: function() {
		this._updateAIFrames()

		// Move fan depending on state
		switch (this.state) {
		case "chase":
			this._chase();
			break;
		case "wander":
			this._wander();
			break;
		}

		this._checkKoreanCollision();
	},

	render: function() {
		this.container.style.left = this.xPos + "px";
		this.container.style.top = this.yPos + "px";
	}
});

var keys, CONSTANTS, korean, fans, gameTimer;

Event.observe(window, "load", function() {
	keys = new Keys();
	CONSTANTS = new Constants();

	resetGame();

	$("frame").style.height = CONSTANTS.HEIGHT + "px";
	$("frame").style.width = CONSTANTS.WIDTH + "px";

	Event.observe(document, "keydown", keyPress);
	Event.observe(document, "keyup", keyPress);
});

function resetGame() {

	var frameChildren = $$("#korean, #message, .fan");
	for (var i = 0; i < frameChildren.length; i++) {
		$("frame").removeChild(frameChildren[i]);
	}

	$("timer").textContent = "0";

	korean = new Korean(CONSTANTS.WIDTH / 2, CONSTANTS.HEIGHT / 2);
	fans = [
		new Fan(0, 0),
		new Fan(0, CONSTANTS.HEIGHT),
		new Fan(CONSTANTS.WIDTH, 0),
		new Fan(CONSTANTS.WIDTH, CONSTANTS.HEIGHT)
	];

	$("frame").appendChild(korean.createHTML());
	for (var i = 0; i < fans.length; i++) {
		$("frame").appendChild(fans[i].createHTML());
	}

	gameTimer = setInterval(loop, 1000 / CONSTANTS.FPS);
}

// Loop that keeps the game running
function loop() {
	korean.update();
	korean.render();

	$("timer").textContent = parseInt(parseInt($("timer").textContent) + 1000 / CONSTANTS.FPS);
	for (var i = 0; i < fans.length; i++) {
		fans[i].update();
		fans[i].render();
	}
}

function keyPress(e) {
	// true onkeydown, false onkeyup
	var pressed = (e.type == "keydown");

	switch (e.keyCode) {
	case Event.KEY_UP:
		Event.stop(e); // Prevent arrow keys from scrolling the page
		keys.up = pressed;
		break;
	case Event.KEY_LEFT:
		keys.left = pressed;
		break;
	case Event.KEY_DOWN:
		Event.stop(e); // Prevent arrow keys from scrolling the page
		keys.down = pressed;
		break;
	case Event.KEY_RIGHT:
		keys.right = pressed;
		break;
	}
}

function clearFrame() {
	var frameChildren = $$("#korean, #frame .fan, #message");
	for (var i = 0; i < frameChildren.length; i++) {
		$("frame").removeChild(frameChildren[i]);
	}
}
