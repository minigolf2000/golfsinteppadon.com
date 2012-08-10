define({

    initialize: function (player, ball) {
        this.player = player;
        this.ball = ball;
        this.state = "wait";
    },

    ////////////////////////////////// FINITE STATE MACHINE //////////////////////////////////
    /**
     *   Calculate steering force based on player state
     */
    calculate: function () {
        switch (this.state) {

            case "chaseBall":
                if (this.player.ballWithinKickingRange() && this.player.isReadyForNextKick === 0) {
                    this.changeState("kickBall");
                    return [0, 0];
                }
                else if (this.player.isClosestTeamMemberToBall()) {
                    return this.seek(this.ball.pos);
                }
                else {
                    this.changeState("returnHome");
                    return [0, 0];
                }
            break;

            case "wait":
                this.player.setVelocity(0, 0);

                if (this.player.team.pitch.gameOn && this.player.isClosestTeamMemberToBall() &&
                    !this.player.team.receivingPlayer && !this.player.team.pitch.goalKeeperHasBall) {
                        this.changeState("chaseBall");
                        return [0, 0];
                }
                return [0, 0];
            break;

            case "returnHome":
                if (this.player.team.pitch.gameOn && this.player.isClosestTeamMemberToBall() &&
                    !this.player.team.receivingPlayer && !this.player.team.pitch.goalKeeperHasBall) {
                        this.changeState("chaseBall");
                        return [0, 0];
                }
                if (this.player.inHomeRegion()) {
                    this.changeState("wait");
                }
                return this.arrive(this.player.homeRegion);
            break;

            case "supportAttacker":
                if (!this.player.team.inControl()) {
                    this.player.team.supportingPlayer = null;
                    this.changeState("returnHome");
                    return [0, 0];
                }

                return this.arrive(this.player.team.getBestSupportSpot());
            break;

            case "arriveReceive":
                if (this.player.ballWithinReceivingRange() || !this.player.team.inControl()) {
                    this.changeState("chaseBall");
                    this.player.team.receivingPlayer = null;
                }
                return this.arrive(this.ball.pos);
            break;

            case "pursuitReceive":
                if (this.player.ballWithinReceivingRange() || !this.player.team.inControl()) {
                    this.changeState("chaseBall");
                    this.player.team.receivingPlayer = null;
                }
                return this.pursuit(this.ball);
            break;

            default:
                return [0, 0];
        }
    },

    /**
     *   Change state of player and run state entrance code
     */
    changeState: function (state) {
        if (state == "kickBall") {
            this.player.team.setControllingPlayer(this.player);
            var dot = dotProduct(normalize(this.player.vel), normalize([this.ball.pos[0] - this.player.pos[0], this.ball.pos[1] - this.player.pos[1]]));
            if (this.player.team.receivingPlayer !== null || this.player.team.pitch.getGoalKeeperHasBall() || dot < 0) {
                this.player.changeState("chaseBall");
                return [0, 0];
            }

            // Attempt to shoot
            var MAX_SHOOTING_FORCE = 25;
            var power = MAX_SHOOTING_FORCE * dot;
            var ballTarget = [this.player.team.awayGoal.x, this.player.team.awayGoal.center];
            var kickDirection;
            var CHANCE_PLAYER_ATTEMPTS_POT_SHOT = 0.005;

            var canShoot = this.player.team.canShoot(this.player, power);
            ballTarget = canShoot[1];
            if (canShoot[0] || Math.random() < CHANCE_PLAYER_ATTEMPTS_POT_SHOT) {
                kickDirection = normalize([ballTarget[0] - this.ball.pos[0], ballTarget[1] - this.ball.pos[1]]);
                this.ball.kick(this.ball.addNoiseToKick(kickDirection), power);
                this.changeState("wait");
                this.player.startKickTimer();
                this.player.findSupport();
                return [0, 0];
            }

            // Attempt to pass

            var receiver = null;
            var MAX_PASSING_FORCE = 22;
            power = MAX_PASSING_FORCE * dot;

            var MIN_PASS_DISTANCE = 120;

            var canPass = this.player.team.canPass(this.player, power, MIN_PASS_DISTANCE);
            receiver = canPass[1];
            ballTarget = canPass[2];
            if (this.player.isThreatened() && canPass[0]) {
                kickDirection = normalize([ballTarget[0] - this.ball.pos[0], ballTarget[1] - this.ball.pos[1]]);
                this.ball.kick(this.ball.addNoiseToKick(kickDirection), power);
                receiver.changeState("receiveBall");
                this.changeState("wait");
                this.player.startKickTimer();
                this.player.findSupport();
                return [0, 0];
            }

            // Dribble
            this.player.startKickTimer();
            this.player.findSupport();
            this.changeState("dribble");
            return;
        }
        else if (state == "dribble") {
            this.player.team.setControllingPlayer(this.player);
            var goalFacing = this.player.team.homeGoal.facing;
            var dot = dotProduct(goalFacing, this.player.vel);

            // If player is facing toward his own goal, turn around
            if (dot < 0) {
                var kickDirection = this.player.heading / 180 * Math.PI;
                var angle = Math.cos(kickDirection) > 0 && goalFacing[0] == 1 || Math.cos(kickDirection) < 0 && goalFacing[0] == -1 ?
                            Math.PI * -1 / 4 : -Math.PI * 3 / 4;
                var TURNING_DRIBBLE_FORCE = 5;

                this.ball.kick([Math.cos(kickDirection + angle), Math.sin(kickDirection + angle)], TURNING_DRIBBLE_FORCE);
            }

            else { // Dribble forward
                var DRIBBLE_FORCE = 7;
                this.ball.kick(goalFacing, DRIBBLE_FORCE);
            }
            this.changeState("chaseBall");
            return;
        }

        else if (state == "receiveBall") {
            this.player.team.setControllingPlayer(this.player);
            this.player.team.receivingPlayer = this.player;
            if (this.player.team.supportingPlayer == this.player) {
                this.player.team.supportingPlayer = null;
            }
            var CHANCE_OF_USING_ARRIVE_TYPE_RECEIVE_BEHAVIOR = 0.5;
            var PASS_THREAT_RADIUS_SQUARED = 22500;
            if (this.player.inHotRegion() || Math.random() < CHANCE_OF_USING_ARRIVE_TYPE_RECEIVE_BEHAVIOR && !this.player.team.isOpponentWithinRadius(this.player.pos, PASS_THREAT_RADIUS_SQUARED)) {
                this.changeState("arriveReceive");
                return;
            }
            else {
                this.changeState("pursuitReceive");
                return;
            }
        }
        this.state = state;

    },

    ////////////////////////////////// STEERING BEHAVIORS //////////////////////////////////
    /**
     *   Seek target
     *   Return the steering force required to seek the given target
     */
    seek: function (target) {
        if (target[0] == this.player.pos[0] && target[1] == this.player.pos[1]) { return [0, 0]; }
        var desiredDirection = normalize([target[0] - this.player.pos[0], target[1] - this.player.pos[1]]);
        var desiredVelocity = [desiredDirection[0] * this.player.maxSpeed, desiredDirection[1] * this.player.maxSpeed];
        var steeringDirection = [desiredVelocity[0] - this.player.vel[0], desiredVelocity[1] - this.player.vel[1]];
        steeringDirection = truncate(steeringDirection, this.maxForce);

        // Separate from opponents to avoid collisions
        var opponents = this.player.team.opponent.players;
        var distance = this.player.PLAYER_RADIUS * this.player.PLAYER_RADIUS;
        for (var i = 0; i < opponents.length; i++) {
            if (distanceSquared(this.player.pos, opponents[i].pos) < distance && dotProduct(normalize(this.player.vel), normalize([opponents[i].pos[0] - this.player.pos[0], opponents[i].pos[1] - this.player.pos[1]])) > 0) {
                var separate = [this.player.pos[0] - opponents[i].pos[0], this.player.pos[1] - opponents[i].pos[1]];
                var separationForce = length(separate) / 5;
                separate = normalize(separate);
                steeringDirection = [steeringDirection[0] + separate[0] * separationForce, steeringDirection[1] + separate[1] * separationForce];
            }
        }
        return steeringDirection;
    },

    /**
     *   Arrive at target
     */
    arrive: function (target) {
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
     *   Pursue target
     */
    pursuit: function (target) {
        var lookAheadTime = (target.vel[0] !== 0 && target.vel[1] !== 0) ? distance(this.player.pos, target.pos) / length(target.vel) : 0;
        return this.seek(target.futurePosition(lookAheadTime));
    }
});