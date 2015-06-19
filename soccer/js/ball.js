Ball = Class.create({
	
	initialize: function(fieldWidth, fieldHeight) {
		this.fieldWidth = fieldWidth;
		this.fieldHeight = fieldHeight;
		this.pos = [fieldWidth / 2 + 3, fieldHeight / 2];
		this.vel = [0, 0];
		this.mass = 1;
		this.BALL_RADIUS = 7;
	},
	
	createHTML: function() {
		this.container = document.createElement("div");
		this.container.id = "ball";
		this.container.style.backgroundPosition = "0px 0px";
		this.render();
		return this.container;
	},
	
	/**
	*	Test collision with walls. Flip velocity as appropriate.
	*/
	testCollisionWithWalls: function() {
		// If ball hits side walls, excluding inside the goals, flip x velocity
		if ((this.pos[0] + this.vel[0] < this.BALL_RADIUS && this.vel[0] < 0 ||
			this.fieldWidth - this.BALL_RADIUS < this.pos[0] + this.vel[0] && this.vel[0] > 0) &&
			(this.pos[1] < 160 || 320 < this.pos[1])) {
				this.vel[0] *= -1;
		}
		// If ball hits top or bottom walls, including the insides of the goals, flip y velocity
		if ((this.pos[1] + this.vel[1] < this.BALL_RADIUS && this.vel[1] < 0 ||
			this.fieldHeight - this.BALL_RADIUS < this.pos[1] + this.vel[1] && this.vel[1] > 0) ||
			((this.pos[0] < 0 || this.pos[0] > this.fieldWidth) &&
			((this.pos[1] + this.vel[1] < this.BALL_RADIUS + 160 && this.vel[1] < 0) ||
			(320 - this.BALL_RADIUS < this.pos[1] + this.vel[1] && this.vel[1] > 0)))) {
				this.vel[1] *= -1;
		}
	},
	
	/**
	*	Kick ball
	*/
	kick: function(direction, force) {
		this.vel = [direction[0] * force, direction[1] * force];
	},
	
	/**
	*	Calculate the time it takes to cover distance
	*/
	timeToCoverDistance: function(from, to, force) {
		var speed = force / this.mass;
		
		var distanceToCover = distance(from, to);
		var term = speed * speed + 2 * distanceToCover * -FRICTION;
		if (term <= 0) { return -1; }
		
		var v = Math.sqrt(term);
		
		return (v - speed) / (-FRICTION);
	},
	
	/**
	*	Calculate where the ball will be at a given time
	*/
	futurePosition: function(time) {
		var normalizedVelocity = normalize(this.vel);
		return [this.pos[0] + normalizedVelocity[0] * time, this.pos[1] + normalizedVelocity[1] * time];
	},
	
	/**
	*	Add randomness to each kick so not each kick will be the same
	*/
	addNoiseToKick: function(kickDirection) {
		return [kickDirection[0] + Math.random() * 0.1 - 0.05, kickDirection[1] + Math.random() * 0.1 - 0.05];
	},

	/**
	*	Stop the ball's movement
	*/
	trap: function() {
		this.vel = [0, 0];
	},
	
	/**
	*	Put the ball in the middle of the field
	*/
	bringToCenter: function() {
		this.trap();
		this.pos = [this.fieldWidth / 2 + 3, this.fieldHeight / 2];
	},
	
	update: function() {
		this.testCollisionWithWalls();
		this.vel = [this.vel[0] * FRICTION, this.vel[1] * FRICTION];
		this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
	},
	
	render: function() {
		this.container.style.left = this.pos[0] - this.BALL_RADIUS + "px";
		this.container.style.top = this.pos[1] - this.BALL_RADIUS + "px";
		// If the ball's velocity is past a threshold, make the ball look like it is rolling
		if (lengthSquared(this.vel) > 9) {
			this.container.style.backgroundPosition = parseInt(this.container.style.backgroundPosition) % 112 - 28 + "px 0px";
		}
	}
});