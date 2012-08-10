define({

    initialize: function (pitch, color, homeGoal, awayGoal, ball, defendingRegions, attackingRegions) {
        this.controllingPlayer = null;
        this.receivingPlayer = null;
        this.closestPlayerToBall = null;
        this.supportingPlayer = null;
        this.players = [];
        this.pitch = pitch;
        this.color = color;
        this.homeGoal = homeGoal;
        this.awayGoal = awayGoal;
        this.ball = ball;
        this.distanceSquaredOfClosestPlayer = 9999999;
        this.defendingRegions = defendingRegions;
        this.attackingRegions = attackingRegions;
        this.state = new TeamStates(this, ball);
        this.opponent = null;

        // Create players
        for (var i = 0; i < defendingRegions.length; i++) {
            this.players[i] = new Player(this.pitch.regions[defendingRegions[i]][0], this.pitch.regions[defendingRegions[i]][1], this, i == 2, pitch.ball);
            $("field").appendChild(this.players[i].createHTML());
        }

        this.state.changeState("kickoff");

        this.supportSpots = [];
        this.currentBestSupportSpot = null;
        this.supportSpotCalculatorCounter = 0; // Counts down from 25, when it is 0 it is ready to calculate another support spot
        // Create support spots
        for (i = 0; i < 5; i++) {
            for (var j = 0; j < 6; j++) {
                this.supportSpots[i * 5 + j] = [[((100 + 50 * i) - this.awayGoal.x) * this.awayGoal.facing[0], 30 + 70 * j], 0];
            }
        }
    },

    setOpponent: function (opponent) {
        this.opponent = opponent;
    },

    calculateClosestPlayerToBall: function () {
        var closestSoFar = 9999999;
        for (var i = 0; i < this.players.length; i++) {
            var dist = distanceSquared(this.ball.pos, this.players[i].pos);
            if (dist < closestSoFar) {
                closestSoFar = dist;
                this.closestPlayerToBall = this.players[i];
            }
        }
        this.distanceSquaredOfClosestPlayer = closestSoFar;
    },

    isOpponentWithinRadius: function (playerPosition, radiusSquared) {
        for (var i = 0; i < this.opponent.players.length; i++) {
            if (distanceSquared(this.ball.pos, playerPosition) < radiusSquared) {
                return true;
            }
        }
        return false;
    },

    updateTargetsOfWaitingPlayers: function () {
        for (var i = 0; i < this.players.length; i++) {
            if (!this.players[i].isKeeper && this.players[i].state.state == "wait") {
                this.players[i].changeState("returnHome");
            }
        }
    },

    /**
     *   Update the data for all children
     */
    update: function () {
        this.calculateClosestPlayerToBall();
        this.state.update();
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].update();
        }
    },

    /**
     *   Re-render all children
     */
    render: function () {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].render();
        }
    },

    /**
     *   Find out if player can shoot. Returns an array [canShoot, targetToShootAt]
     */
    canShoot: function (shooter, power) {
        var ballTarget = [this.awayGoal.x, this.awayGoal.center];
        var NUM_ATTEMPTS_TO_FIND_VALID_STRIKE = 5;
        var numAttempts = NUM_ATTEMPTS_TO_FIND_VALID_STRIKE;

        while (numAttempts--) {
            var minYVal = this.awayGoal.topPost;
            var maxYVal = this.awayGoal.bottomPost;
            ballTarget = [this.awayGoal.x, Math.random() * (maxYVal - minYVal) + minYVal];
            var time = this.ball.timeToCoverDistance(this.ball.pos, ballTarget, power);

            if (time > 0 && this.isPassSafeFromAllOpponents(shooter, ballTarget, null, power)) {
                return [true, ballTarget];
            }
        }
        return [false, ballTarget];
    },

    /**
     *   Find out if player can pass to a teammate. Returns an array [canPass, pointer to the receiver, vector of the pass]
     */
    canPass: function (passer, power, MIN_PASS_DISTANCE) {
        var receiver = null;
        var ballTarget;
        var finalBallTarget;

        var closestSoFar = 9999999;
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i] != passer && distance(passer.pos, this.players[i].pos) > MIN_PASS_DISTANCE) {
                var bestPass = this.getBestPassToReceiver(passer, this.players[i], power);
                ballTarget = bestPass[1];
                if (bestPass[0]) {
                    var dist2goal = Math.abs(ballTarget[0] - this.awayGoal.x);
                    if (dist2goal < closestSoFar) {
                        closestSoFar = dist2goal;
                        receiver = this.players[i];
                        finalBallTarget = ballTarget;
                    }
                }
            }
        }
        if (receiver) { return [true, receiver, finalBallTarget]; }
        else { return [false, receiver, finalBallTarget]; }
    },

    /**
     *    Find the best pass that can be made from the ball's current position. Return an array [canPass, vector of the best pass]
     */
    getBestPassToReceiver: function (passer, receiver, power) {
        var ballTarget;
        var time = this.ball.timeToCoverDistance(this.ball.pos, receiver.pos, power);
        if (time <= 0) { return [false, [0, 0]]; }

        var PASS_SCALING_FACTOR = 0.3;
        var interceptRange = time * receiver.maxSpeed * PASS_SCALING_FACTOR;

        var offset = normalize([receiver.pos[1] - this.ball.pos[1], this.ball.pos[0] - receiver.pos[0]]);
        var point1 = [receiver.pos[0] + offset[0] * interceptRange, receiver.pos[1] + offset[1] * interceptRange];
        var point2 = [receiver.pos[0] - offset[0] * interceptRange, receiver.pos[1] - offset[1] * interceptRange];

        var passes = [point1, receiver.pos, point2];
        var closestSoFar = 9999999;
        var canPass = false;

        for (var i = 0; i < passes.length; i++) {
            var dist = Math.abs(passes[i][0] - this.awayGoal.x);

            if (dist < closestSoFar && this.isPassSafeFromAllOpponents(passer, passes[i], receiver, power)) {
                closestSoFar = dist;
                ballTarget = passes[i];
                canPass = true;
            }
        }

        return [canPass, ballTarget];
    },

    isPassSafeFromAllOpponents: function (passer, ballTarget, receiver, power) {
        for (var i = 0; i < this.opponent.players.length; i++) {
            if (!this.isPassSafeFromOpponent(passer, ballTarget, receiver, this.opponent.players[i], power)) {
                return false;
            }
        }
        return true;
    },

    isPassSafeFromOpponent: function (passer, ballTarget, receiver, opponent, force) {
        if (dotProduct([opponent.pos[0] - passer.pos[0], opponent.pos[1] - passer.pos[1]], passer.vel) < 0) { return true; }

        if (distanceSquared(passer.pos, ballTarget) < distanceSquared(opponent.pos, passer.pos)) {
            if (receiver) {
                if (distanceSquared(ballTarget, opponent.pos) > distanceSquared(ballTarget, receiver.pos)) {
                    return true;
                }
            }

            else {
                return true;
            }
        }

        // Find the vector projection of two vectors
        // Vector a is the vector from the passer to the ball target
        var a = [ballTarget[0] - passer.pos[0], ballTarget[1] - passer.pos[1]];
        // Vector b is the vector from the passer to the opponent
        var b = [opponent.pos[0] - passer.pos[0], opponent.pos[1] - passer.pos[1]];

        var term = (a[0] * b[0] + a[1] * b[1]) / lengthSquared(a);
        var intersectPoint = [term * a[0], term * a[1]];
        var timeForBall = this.ball.timeToCoverDistance([0, 0], intersectPoint, force);

        // How far the opponent can run in this time
        var reach = opponent.maxSpeed * timeForBall + this.ball.BALL_RADIUS + opponent.PLAYER_RADIUS;

        return (distance(intersectPoint, b) >= reach);
    },

    setControllingPlayer: function (controllingPlayer) {
        this.controllingPlayer = controllingPlayer;
        this.opponent.controllingPlayer = null;
    },

    changeState: function (state) {
        this.state.changeState(state);
    },

    inControl: function () {
        return this.controllingPlayer !== null;
    },

    setPlayerHomeRegions: function (regions) {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].homeRegion = this.pitch.regions[regions[i]];
        }
    },

    returnAllFieldPlayersToHome: function (regions) {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].changeState("returnHome");
        }
    },


    ///////////////////////////////////////// SUPPORT SPOT CALCULATOR /////////////////////////////////////////
    getBestSupportSpot: function () {
        // Only calculate a new support spot once every 25 frames (1 per second)
        if (this.supportSpotCalculatorCounter > 0) {
            this.supportSpotCalculatorCounter--;
            return this.currentBestSupportSpot;
        }

        var bestSupportSpot = null;
        var bestScoreSoFar = 0;

        var PASS_SAFE_SCORE = 2;
        //var CAN_SCORE_SCORE = 1;
        var DIST_FROM_CONTROLLING_PLAYER_SCORE = 2;
        var OPTIMAL_DISTANCE = 250;

        var MAX_PASSING_FORCE = 22;
        //var MAX_SHOOTING_FORCE = 25;

        for (var i = 0; i < this.supportSpots.length; i++) {
            // Reset previous score
            this.supportSpots[i][1] = 0;

            if (this.isPassSafeFromAllOpponents(this.controllingPlayer, this.supportSpots[i][0], null, MAX_PASSING_FORCE)) {
                this.supportSpots[i][1] += PASS_SAFE_SCORE;
            }

            // Passed variables aren't matching
            // var canShoot = this.canShoot(temp, MAX_SHOOTING_FORCE);
            // if (canShoot[0])
                // this.supportSpots[i][1] += CAN_SCORE_SCORE;

            var dist = distance(this.controllingPlayer.pos, this.supportSpots[i][0]);
            var difference = Math.abs(OPTIMAL_DISTANCE - dist);
            if (difference < OPTIMAL_DISTANCE) {
                this.supportSpots[i][1] += DIST_FROM_CONTROLLING_PLAYER_SCORE * (OPTIMAL_DISTANCE - difference) / OPTIMAL_DISTANCE;
            }

            if (this.supportSpots[i][1] > bestScoreSoFar) {
                bestScoreSoFar = this.supportSpots[i][1];
                bestSupportSpot = this.supportSpots[i];
            }
        }
        this.supportSpotCalculatorCounter = 25;
        this.currentBestSupportSpot = bestSupportSpot[0];
        return bestSupportSpot[0];
    },

    determineBestSupportingAttacker: function () {
        var closestSoFar = 999999;
        var bestPlayerSoFar = null;
        for (var i = 0; i < this.players.length; i++) {
            if (!this.players[i].isControllingPlayer()) {
                var dist = distanceSquared(this.players[i].pos, this.getBestSupportSpot());
                if (dist < closestSoFar) {
                    closestSoFar = dist;
                    bestPlayerSoFar = this.players[i];
                }
            }
        }
        return bestPlayerSoFar;
    }
});