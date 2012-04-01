var tictactoe = (function (tictactoe) {

    var _ = {};

    /**
     * Return the next cell to move to
     * Easy AI will a random cell to move to.
     *
     * @param {array} board the array of the current board ([x, o, , , x, o, , , ])
     */
    _.findNextMove = function (board) {
        var cell;
        while (1) {
            cell = Math.floor(Math.random() * 9);
            if (board[cell] == '') {
                tictactoe.move(cell);
                return;
            }
        }
    };
    
    tictactoe.easyAI = {findNextMove: _.findNextMove};
    return tictactoe;

})(tictactoe || {});