GoalKeeperState = Class.create({
	
	initialize: function(player, ball) {
		this.player = player;
		this.ball = ball;
		this.state = "tendGoal";
	},
	
	////////////////////////////////// FINITE STATE MACHINE //////////////////////////////////
	/**
	*	Calculate steering force based on player state
	*/
	calculate: function() {
		switch (this.state) {
			
			case "tendGoal":
				if (this.player.ballWithinKickingRange()) {
					this.ball.trap();
					this.player.team.pitch.goalKeeperHasBall = true;
					this.changeState("putBallBackInPlay");
					return [0, 0];
				}
				if (this.player.ballWithinRangeForIntercept()) {
					this.changeState("interceptBall");
				}
				return this.interpose();
			break;
			
			case "interceptBall":
				if (this.player.ballWithinKickingRange()) {
					this.ball.trap();
					this.player.team.pitch.goalKeeperHasBall = true;
					this.changeState("putBallBackInPlay");
					return [0, 0];
				}
				else if ((this.player.tooFarFromGoalMouth() && !this.player.isClosestPlayerOnPitchToBall()) ||
						  (this.player.team.inControl() && this.player.team.receivingPlayer != this.player)) {
					this.changeState("tendGoal");
					return [0, 0];
				}
				else {
					return this.pursuit(this.ball);
				}
			break;
			
			case "putBallBackInPlay":
				// Attempt to pass
				var MAX_PASSING_FORCE = 22;
				var MIN_PASS_DISTANCE = 120;
				
				var canPass = this.player.team.canPass(this.player, MAX_PASSING_FORCE, MIN_PASS_DISTANCE);
				var receiver = canPass[1];
				var ballTarget = canPass[2];
				if (canPass[0]) {
					var kickDirection = normalize([ballTarget[0] - this.ball.pos[0], ballTarget[1] - this.ball.pos[1]]);
					this.ball.kick(kickDirection, MAX_PASSING_FORCE);
					this.player.team.pitch.goalKeeperHasBall = false;
					this.changeState("tendGoal");
					receiver.changeState("receiveBall");
				}
				this.player.setVelocity(0, 0);
				return [0, 0];
			break;
			
			default:
				return [0, 0];
		}
	},
	
	/**
	*	Change state of player and run state entrance code
	*/
	changeState: function(state) {
		if (state == "putBallBackInPlay") {
			this.player.team.setControllingPlayer(this.player);
			this.player.team.receivingPlayer = null;
			this.player.team.returnAllFieldPlayersToHome();
			this.player.team.opponent.returnAllFieldPlayersToHome();
		}
		
		else if (state == "receiveBall") {
			this.player.team.setControllingPlayer(this.player);
			this.player.team.receivingPlayer = this.player;
			
			this.changeState("interceptBall");
			return;
		}
		
		else if (state == "returnHome") {
			this.changeState("tendGoal");
			return;
		}
		
		this.state = state;
		
	},
	
	////////////////////////////////// STEERING BEHAVIORS ////////////////////////////////// 
	/**
	*	Seek target
	*	Return the steering force required to seek the given target
	*/
	seek: function(target) {
		if (target[0] == this.player.pos[0] && target[1] == this.player.pos[1]) { return [0, 0]; }
		var desiredDirection = normalize([target[0] - this.player.pos[0], target[1] - this.player.pos[1]]);
		var desiredVelocity = [desiredDirection[0] * this.player.maxSpeed, desiredDirection[1] * this.player.maxSpeed];
		var steeringDirection = [desiredVelocity[0] - this.player.vel[0], desiredVelocity[1] - this.player.vel[1]];
		return truncate(steeringDirection, this.maxForce);
	},
	
	/**
	*	Arrive at target
	*/
	arrive: function(target) {
		if (target[0] == this.player.pos[0] && target[1] == this.player.pos[1]) { return [0, 0]; }
		var toTarget = [target[0] - this.player.pos[0], target[1] - this.player.pos[1]];
	    var dist = length(toTarget);
		var SLOWING_DISTANCE = 100;
	    var rampedSpeed = this.player.maxSpeed * (dist / SLOWING_DISTANCE);
	    var clippedSpeed = Math.min(rampedSpeed, this.player.maxSpeed);
	    var desiredVelocity = [(clippedSpeed / dist) * toTarget[0], (clippedSpeed / dist) * toTarget[1]];
	    return [desiredVelocity[0] - this.player.vel[0], desiredVelocity[1] - this.player.vel[1]];
	},
	
	/**
	*	Pursue target
	*/
	pursuit: function(target) {
		var lookAheadTime = (target.vel[0] !== 0 && target.vel[1] !== 0) ? distance(this.player.pos, target.pos) / length(target.vel) : 0;
		return this.seek(target.futurePosition(lookAheadTime));
	},
	
	/**
	*	Interpose target
	*/
	interpose: function() {
		var rearInterposeTarget = this.player.getRearInterposeTarget();
		var midpoint = [(this.ball.pos[0] + rearInterposeTarget[0]) / 2, (this.ball.pos[1] + rearInterposeTarget[1]) / 2];
		var timeToReachMidpoint = distance(this.player.pos, midpoint) / this.player.maxSpeed;
		var futureBallPosition = [this.ball.pos[0] + this.ball.vel[0] * timeToReachMidpoint, this.ball.pos[1] + this.ball.vel[1] * timeToReachMidpoint];
		var directionFromGoal = normalize([futureBallPosition[0] - rearInterposeTarget[0], futureBallPosition[1] - rearInterposeTarget[1]]);
		var INTERPOSE_DISTANCE = 50;
		var interposeLocation = [rearInterposeTarget[0] + directionFromGoal[0] * INTERPOSE_DISTANCE, rearInterposeTarget[1] + directionFromGoal[1] * INTERPOSE_DISTANCE];
		return this.arrive(interposeLocation);
	}
});