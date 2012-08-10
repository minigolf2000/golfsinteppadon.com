/**
*   The pitch class contains all the objects of the game and the constants for the playing field
*/
define(['Goal', 'Ball', 'SoccerTeam'], {

    initialize: function () {
        this.WIDTH = 800;
        this.HEIGHT = 480;

        // Create regions
        this.regions = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 12; j++) {
                this.regions[i * 12 + j] = [j * this.WIDTH / 12 + this.WIDTH / 24, i * this.HEIGHT / 3 + this.HEIGHT / 6];
            }
        }
        this.RED_DEFENDING_REGIONS = [2, 4, 12, 26, 28];
        this.BLUE_DEFENDING_REGIONS = [7, 9, 23, 31, 33];
        this.RED_ATTACKING_REGIONS = [15, 8, 12, 28, 32];
        this.BLUE_ATTACKING_REGIONS = [3, 20, 23, 27, 31];

        // Create ball
        this.ball = new Ball(this.WIDTH, this.HEIGHT);
        $("field").appendChild(this.ball.createHTML());

        // Create goals
        this.redGoal = new Goal(0, [1, 0]);
        this.blueGoal = new Goal(this.WIDTH, [-1, 0]);

        // Create players
        this.redTeam = new SoccerTeam(this, "red", this.redGoal, this.blueGoal,
                                      this.ball, this.RED_DEFENDING_REGIONS, this.RED_ATTACKING_REGIONS, this.blueTeam);
        this.blueTeam = new SoccerTeam(this, "blue", this.blueGoal, this.redGoal,
                                       this.ball, this.BLUE_DEFENDING_REGIONS, this.BLUE_ATTACKING_REGIONS, this.redTeam);
        this.redTeam.setOpponent(this.blueTeam);
        this.blueTeam.setOpponent(this.redTeam);

        // Default state
        this.gameOn = false;
        this.goalKeeperHasBall = false;
        this.refreshScoreboard();

    },

    getGoalKeeperHasBall: function () {
        return this.goalKeeperHasBall;
    },

    refreshScoreboard: function () {
        $('#redGoals').text(this.blueGoal.goalsScored);
        $('#blueGoals').text(this.redGoal.goalsScored);
    },

    /**
     *   Update the data for all children
     */
    update: function () {
        this.redTeam.update();
        this.blueTeam.update();
        this.ball.update();

        if (this.redGoal.scored(this.ball.pos, this.ball.BALL_RADIUS) || this.blueGoal.scored(this.ball.pos, this.ball.BALL_RADIUS)) {
            this.gameOn = false;
            this.ball.bringToCenter();

            this.redTeam.changeState("kickoff");
            this.blueTeam.changeState("kickoff");

            this.refreshScoreboard();
        }
    },

    /**
     *   Re-render all children
     */
    render: function () {
        this.redTeam.render();
        this.blueTeam.render();
        this.ball.render();
    }
});