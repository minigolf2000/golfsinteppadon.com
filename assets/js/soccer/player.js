Player = Class.create({

	initialize: function(xPos, yPos, team, isKeeper, ball) {
		this.PLAYER_RADIUS = 20;
		this.mass = 5;
		// Add noise to the starting positions
		this.pos = [xPos + Math.random() * 20 - 10, yPos + Math.random() * 20 - 10];
		this.vel = [0, 0];
		this.maxForce = 10;
		this.maxSpeed = 5;
		this.heading = 0;
		this.team = team;
		this.ball = ball;
		this.isKeeper = isKeeper;
		this.state = (isKeeper) ? new GoalKeeperState(this, ball) : new FieldPlayerState(this, ball);
		this.isReadyForNextKick = 0; // Frames before player can next kick the ball, 0 means player is ready
		this.homeRegion = null; // Point on the field that is assigned as the player's home position
	},

	/**
	*	Constructor
	*/
	createHTML: function() {
		this.container = document.createElement("img");
		this.container.src = "/assets/images/soccer/" + this.team.color + ".png";
		this.container.addClassName("player");
		this.container.addClassName(this.team.color);
		this.render();
		return this.container;
	},

	setVelocity: function(xVel, yVel) {
		this.vel = [xVel, yVel];
	},

	changeState: function(state) {
		this.state.changeState(state);
	},

	ballWithinKickingRange: function() {
		var ballPosition = this.ball.pos;
		return Math.sqrt((this.pos[0] - ballPosition[0]) * (this.pos[0] - ballPosition[0]) + (this.pos[1] - ballPosition[1]) * (this.pos[1] - ballPosition[1])) < this.PLAYER_RADIUS;
	},

	isControllingPlayer: function() {
		return this.team.controllingPlayer == this;
	},

	inHomeRegion: function() {
		return distanceSquared(this.pos, this.homeRegion) < 400;
	},

	ballWithinReceivingRange: function() {
		var RECEIVING_RANGE = 2500;
		return distanceSquared(this.pos, this.ball.pos) < RECEIVING_RANGE;
	},

	///////////////////////////////////////// FIELD PLAYERS /////////////////////////////////////////
	isThreatened: function() {
		var COMFORT_ZONE = 40000;

		for (var i = 0; i < this.team.opponent.players.length; i++) {
			var opponentIsInFrontOfPlayer = dotProduct([this.team.opponent.players[i].pos[0] - this.pos[0], this.team.opponent.players[i].pos[1] - this.pos[1]], this.vel) > 0;
			if (opponentIsInFrontOfPlayer && distanceSquared(this.pos, this.team.opponent.players[i].pos) < COMFORT_ZONE) {
				return true;
			}
		}
		return false;
	},

	isClosestTeamMemberToBall: function() {
		return this.team.closestPlayerToBall == this;
	},

	inHotRegion: function() {
		return Math.abs(this.pos[0] - this.team.awayGoal.x) < this.team.pitch.WIDTH / 3;
	},

	findSupport: function(state) {
		var supportPlayer = this.team.determineBestSupportingAttacker();
		if (!this.team.supportingPlayer) {
			this.team.supportingPlayer = supportPlayer;
			supportPlayer.changeState("supportAttacker");
		}

		else if (supportPlayer != this.team.supportingPlayer) {
			this.team.supportingPlayer.changeState("returnHome");
			this.team.supportingPlayer = supportPlayer;
			supportPlayer.changeState("supportAttacker");
		}
	},

	/**
	*	Start the kick timer.
	*/
	startKickTimer: function(target) {
		var PLAYER_KICK_FREQUENCY = 4; // Player can only kick once every 4 frames to prevent jitteryness
		this.isReadyForNextKick = PLAYER_KICK_FREQUENCY;
	},

	///////////////////////////////////////// GOAL KEEPERS /////////////////////////////////////////
	ballWithinRangeForIntercept: function() {
		var GOAL_KEEPER_INTERCEPT_DISTANCE_SQUARED = 24000;
		return distanceSquared([this.team.homeGoal.x, 240], this.ball.pos) < GOAL_KEEPER_INTERCEPT_DISTANCE_SQUARED;
	},

	tooFarFromGoalMouth: function() {
		var GOAL_KEEPER_INTERCEPT_DISTANCE_SQUARED = 24000;
		return distanceSquared(this.pos, this.getRearInterposeTarget()) > GOAL_KEEPER_INTERCEPT_DISTANCE_SQUARED;
	},


	isClosestPlayerOnPitchToBall: function() {
		return (this.team.closestPlayerToBall == this && this.team.opponent.distanceSquaredOfClosestPlayer > distanceSquared(this.pos, this.ball.pos));
	},

	getRearInterposeTarget: function() {
		var x = this.team.homeGoal.x;
		var y = this.team.pitch.HEIGHT / 2 - 80 + this.ball.pos[1] * 160 / this.team.pitch.HEIGHT;
		return [x, y];
	},

	update: function() {
		// Recalculate desired movement
		var steeringForce = this.state.calculate();

		// Update velocity
		var accel = [steeringForce[0] / this.mass, steeringForce[1] / this.mass];
		this.vel = truncate([this.vel[0] + accel[0], this.vel[1] + accel[1], this.maxSpeed]);

		// Update position
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];

		// Update heading
		// Players face in direction of velocity if moving
		if (this.vel[1] > 0.00001 && !this.isKeeper) {
			this.heading = 180 - Math.atan(this.vel[0] / this.vel[1]) * 180 / Math.PI;
		}
		else if (this.vel[1] < -0.00001 && !this.isKeeper) {
			this.heading = Math.atan(this.vel[0] / -this.vel[1]) * 180 / Math.PI;
		}
		// All goalkeepers or players that are not moving turn to face the ball
		else if ((this.vel[0] === 0 && this.vel[1] === 0) || this.isKeeper) {
			this.heading = (this.ball.pos[1] - this.pos[1] >= 0) ?
								180 - Math.atan((this.ball.pos[0] - this.pos[0]) / (this.ball.pos[1] - this.pos[1])) * 180 / Math.PI :
								-Math.atan((this.ball.pos[0] - this.pos[0]) / (this.ball.pos[1] - this.pos[1])) * 180 / Math.PI;
		}

		if (this.isReadyForNextKick > 0) {
			this.isReadyForNextKick--;
		}
	},

	render: function() {
		this.container.style.left = this.pos[0] - this.PLAYER_RADIUS + "px";
		this.container.style.top = this.pos[1] - this.PLAYER_RADIUS + "px";
		this.container.style.WebkitTransform = "rotate(" + this.heading + "deg)";
		this.container.style.MozTransform = "rotate(" + this.heading + "deg)";
this.container.style.OTransform = "rotate(" + this.heading + "deg)";
	}
});
