define({

    initialize: function (x, facing) {
        // The goal's x position on the field
        this.topPost = 160;
        this.bottomPost = 320;
        this.center = 240;
        this.x = x;
        this.facing = facing;
        this.goalsScored = 0;
    },

    /**
     *   Return true if a goal was scored
     */
    scored: function (ballPosition, ballRadius) {
        if (this.x === 0 && ballPosition[0] + ballRadius + 3 < 0 || this.x === 800 && ballPosition[0] - ballRadius - 3 > 800) {
            this.goalsScored++;
            return true;
        }
    }
});