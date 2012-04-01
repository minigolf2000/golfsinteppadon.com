var tictactoe = (function (self) {

    var _ = {};

    _.initialize = function () {
        self.hardAI = {findNextMove: _.findNextMove};
    };

    /**
     * Return the next cell to move to.
     * Hard AI uses minimax to crush you.
     *
     * @param {array} board the array of the current board ([x, o, , , x, o, , , ])
     */
    _.findNextMove = function (board) {
        _.maximin(board, -1, 1);
    };

    _.maximin = function (board, lowerBound, upperBound) {
        var end = board.checkEnd();
        if (end == "tie") {
            board.heuristic = 0;
        }
        else if (end) {
            board.heuristic = board.oTurn == "x" ? -1 : 1;
        }
        for (var i = 0; i < 9; i++) {
            if (board.cells[i].container.owner == null) {
                var newBoard = board.clone(board);

                board.cells[i].container.onclick();

                _.minimax(newBoard, lowerBound, upperBound);

                if (newBoard.heuristic > lowerBound) {
                    lowerBound = newBoard.heuristic;
                    board.optimalNextMove = i;
                }
                if (lowerBound >= upperBound) {
                    return lowerBound;
                }
            }
        }
        board.heuristic = lowerBound;
    },

    _.minimax = function (board, lowerBound, upperBound) {
        var end = board.checkEnd();
        if (end == "tie") {
            board.heuristic = 0;
        }
        else if (end) {
            board.heuristic = board.oTurn == "x" ? -1 : 1;
        }
        for (var i = 0; i < 9; i++) {
            if (board.cells[i].container.owner == null) {
                var newBoard = board.clone();

                board.cells[i].container.onclick();

                _.maximin(newBoard, lowerBound, upperBound);

                if (newBoard.heuristic < upperBound) {
                    upperBound = newBoard.heuristic;
                    board.optimalNextMove = i;
                }
                if (lowerBound >= upperBound) {
                    return lowerBound;
                }
            }
        }
        board.heuristic = upperBound;
    }

    $(function () {
        _.initialize();
    });

    return self;

})(tictactoe || {});