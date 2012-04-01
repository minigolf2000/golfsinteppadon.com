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
        var answer = _.maximin(board, {lastMove: null, value: -1}, {lastMove: null, value: 1});
        console.log(answer);
        tictactoe.move(answer.move);
    };

    _.maximin = function (board, alpha, beta) {
        var end = tictactoe.board.checkEnd();
        if (end == "tie") {
            return {value: 0};
        } else if (end) {
            return {value: ((board.oTurn && end.player == 'o') || (!board.oTurn && end.player == "x") ? 1 : -1)};
        }
        var heuristic;
        for (var i = 0; i < 9; i++) {
            if (board[i] == '') {
                var newBoard = _.clone(board);
                newBoard[i] = (board.oTurn) ? 'o' : 'x';

                var heuristic = _.minimax(newBoard, alpha, beta);

                if (heuristic.value > alpha.value) {
                    alpha = {move: i, value: heuristic.value};
                }
                if (alpha.value >= beta.value) {
                    return alpha;
                }
            }
        }
        return alpha
    };

    _.minimax = function (board, alpha, beta) {
        var end = tictactoe.board.checkEnd();
        if (end == "tie") {
            return {value: 0};
        } else if (end) {
            return {value: ((board.oTurn && end.player == 'o') || (!board.oTurn && end.player == "x") ? 1 : -1)};
        }
        var heuristic;
        for (var i = 0; i < 9; i++) {
            if (board[i] == '') {
                var newBoard = _.clone(board);
                newBoard[i] = (board.oTurn) ? 'o' : 'x';

                var heuristic = _.maximin(newBoard, alpha, beta);

                if (heuristic.value < beta.value) {
                    beta = {move: i, value: heuristic.value};
                }
                if (beta.value <= alpha.value) {
                    return beta;
                }
            }
        }
        return beta;
    };


    /**
     * Return the clone of an array
     */
    _.clone = function (array) {
        return array.slice(0);
    };

    $(function () {
        _.initialize();
    });

    return self;

})(tictactoe || {});